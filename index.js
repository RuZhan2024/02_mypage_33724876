// index.js
const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const { StringDecoder } = require("string_decoder");

const port = 8000;
const ROOT = __dirname;
const VIEWS = path.join(ROOT, "views");
const PUBLIC = path.join(ROOT, "public");

// ------------------------- Utilities ------------------------------------------------------------
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".js":   "application/javascript; charset=utf-8",
  ".svg":  "image/svg+xml",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".ico":  "image/x-icon",
  ".json": "application/json; charset=utf-8",
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, { "Content-Length": Buffer.byteLength(body), ...headers });
  res.end(body);
}

function render(templateName, data, res) {
  const filePath = path.join(VIEWS, templateName + ".ejs");
  fs.readFile(filePath, "utf8", (err, tpl) => {
    if (err) return send(res, 500, "Server Error", { "Content-Type": "text/plain" });
    const rendered = tpl.replace(/<%=\s*(\w+)\s*%>/g, (_, k) => (data[k] ?? ""));
    send(res, 200, rendered, { "Content-Type": "text/html; charset=utf-8" });
  });
}

function serveStatic(reqPath, res) {
  const filePath = path.normalize(path.join(PUBLIC, reqPath.replace(/^\/public\//, "")));
  if (!filePath.startsWith(PUBLIC)) return notFound(res); // path traversal guard
  fs.readFile(filePath, (err, buf) => {
    if (err) return notFound(res);
    const ext = path.extname(filePath);
    send(res, 200, buf, { "Content-Type": mime[ext] || "application/octet-stream" });
  });
}

function notFound(res) {
  send(res, 404, '<h1>404 Not Found</h1><p><a href="/">Go Home</a></p>', { "Content-Type": "text/html; charset=utf-8" });
}

// ---------------------------- Server ---------------------------------------------------------------
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  console.log(`${req.method} ${pathname}`);

  // Static assets
  if (pathname.startsWith("/public/")) return serveStatic(pathname, res);

  // APIs (no libs)
  if (pathname === "/api/time" && req.method === "GET") {
    return send(res, 200, JSON.stringify({ now: new Date().toISOString() }), { "Content-Type": mime[".json"] });
  }

  // Pages
  if (pathname === "/") {
    const params = {
      lang: "en",
      studentName: "Glen Ru (maybe Adrian Ru)",
      studentID: 33724876,
      greeting: query.greeting || "Welcome to my page. Enjoy your time!",
    };
    return render("index", params, res);
  }

  if (pathname === "/about") {
    const params = {
      lang: "en",
      studentName: "Glen Ru (Adrian Ru in student system. Who knows what happened!)",
      major: "BSc Computer Science",
      hobby: "Machine Learning and Full-Stack Development",
    };
    return render("about", params, res);
  }

  // Fallback
  return notFound(res);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
