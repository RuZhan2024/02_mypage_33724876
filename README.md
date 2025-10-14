# MyPage_33724876

Coursework for **Dynamic Web Applications**.
A minimal web app implemented with **Node.js core modules only**. It serves HTML templates, static assets (CSS/JS). A tiny placeholder-based renderer handles `<%= key %>` tokens in templates.

## 1. Requirements

* Node.js (If it doesn’t work on your current Node version, switch to Node 18+)
* A web browser

## 2. Project Structure

```
02_mypage_33724876/
├─ index.js                # HTTP server, routing, templating, static files, JSON APIs
├─ package.json
├─ views/
│  ├─ index.ejs            # Home page template
│  └─ about.ejs            # About page template
└─ public/
   ├─ style.css            # Styles (dark/light themes)
   └─ app.js               # Front-end interactions
```

## 3. Installation

```bash
git clone https://github.com/RuZhan2024/02_mypage_33724876.git
cd 02_mypage_33724876
npm install
```

## 4. Run the Project

```bash
npm start
# or
node index.js
```

Open:

* Home:  [http://localhost:8000](http://localhost:8000)
* About: [http://localhost:8000/about](http://localhost:8000/about)

## 5. Functionality Overview

* **No external dependencies** — uses `http`, `fs`, `path`, `url`, etc.
* **Templates** — simple `<%= key %>` replacement (no code execution).
* **Static assets** — served from `/public/` (CSS and JS).
* **Front-end interactions** — theme toggle, server time fetch (implemented in `public/app.js`).
* **Manual routing** — implemented in `index.js`.

## 6. Routes

### 6.1 Pages

* `GET /`
  Renders `views/index.ejs` with:

  * `studentName`, `studentID`, `greeting`, `lang`
    Example: `/?greeting=Hello`

* `GET /about`
  Renders `views/about.ejs` with:

  * `studentName`, `major`, `hobby`, `lang`

### 6.2 Static Assets

* `GET /public/style.css`
* `GET /public/app.js`

### 6.3 JSON APIs

* `GET /api/time`
  Returns the current server time in ISO format: `{"now":"...Z"}`

## 7. Template Usage

In a template:

```html
<p>Hello, <%= studentName %></p>
```

In `index.js`:

```js
render("index", { studentName: "Glen Ru", greeting: "Welcome" }, res);
```

## 8. Implementation Notes

* Static file serving includes a path-traversal guard by validating resolved paths under `public/`.
* `parseBody` handles JSON and URL-encoded forms using core modules.
* The minimal renderer is intended for coursework demonstrations, not production.

## 9. Troubleshooting

* **Port in use**: edit `const port = 8000;` in `index.js`.
* **Static 404**: ensure files are under `public/` and URLs begin with `/public/`.
* **CORS**: cross-origin requests are not enabled; add headers in `send()` if required.

## 10. Scripts

```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

## 11. License
For educational purposes. You may adapt the code for coursework or prototypes.
