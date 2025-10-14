// public/app.js
(function () {
  const $ = (sel) => document.querySelector(sel);

  // Theme toggle (remember per session)
  const themeBtn = $("#themeBtn");
  if (themeBtn) {
    const body = document.body;
    const saved = sessionStorage.getItem("theme") || "dark";
    if (saved === "light") body.classList.add("light");
    themeBtn.addEventListener("click", () => {
      body.classList.toggle("light");
      sessionStorage.setItem("theme", body.classList.contains("light") ? "light" : "dark");
    });
  }

  // Server time
  const timeBtn = $("#timeBtn");
  const timeEl  = $("#time");
  if (timeBtn && timeEl) {
    timeBtn.addEventListener("click", async () => {
      timeBtn.disabled = true;
      timeEl.textContent = "Loading…";
      try {
        const res = await fetch("/api/time");
        const data = await res.json();
        timeEl.textContent = new Date(data.now).toLocaleString();
      } catch {
        timeEl.textContent = "Failed to fetch time.";
      } finally {
        timeBtn.disabled = false;
      }
    });
  }
})();
