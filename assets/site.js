(function () {
  "use strict";
  const localeKey = "peishenglai-home-locale";
  const themeKey = "peishenglai-home-theme";
  let locale = "zh";
  let theme = "day";
  const requestedLocale = new URLSearchParams(window.location.search).get("lang");
  try {
    const savedLocale = localStorage.getItem(localeKey);
    const savedTheme = localStorage.getItem(themeKey);
    if (requestedLocale === "en" || requestedLocale === "zh") { locale = requestedLocale; localStorage.setItem(localeKey, locale); }
    else if (savedLocale === "en" || savedLocale === "zh") locale = savedLocale;
    if (savedTheme === "night" || savedTheme === "day") theme = savedTheme;
  } catch (_) { /* Storage may be disabled; the page still works in Chinese/day mode. */ }

  function paintLocale() {
    document.documentElement.dataset.locale = locale;
    document.documentElement.lang = locale === "en" ? "en" : "zh-CN";
    document.querySelectorAll("[data-copy-lang]").forEach(function (node) {
      node.hidden = node.getAttribute("data-copy-lang") !== locale;
    });
    document.querySelectorAll("[data-aria-zh]").forEach(function (node) {
      const label = node.getAttribute("data-aria-" + locale);
      if (label) node.setAttribute("aria-label", label);
    });
    document.querySelectorAll("[data-language]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.getAttribute("data-language") === locale));
    });
    const title = document.documentElement.getAttribute("data-title-" + locale);
    const description = document.documentElement.getAttribute("data-description-" + locale);
    if (title) document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (description && meta) meta.setAttribute("content", description);
  }
  function paintTheme() {
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(theme === "night"));
      const label = locale === "zh" ? (theme === "night" ? "日间" : "夜色") : (theme === "night" ? "Day" : "Night");
      button.setAttribute("aria-label", locale === "zh" ? "切换到" + label + "主题" : "Switch to " + label + " theme");
    });
  }
  function setLocale(next) {
    if (next !== "zh" && next !== "en") return;
    locale = next;
    try { localStorage.setItem(localeKey, locale); } catch (_) {}
    paintLocale();
    paintTheme();
    document.dispatchEvent(new CustomEvent("site:localechange", { detail: { locale: locale } }));
  }
  function setTheme(next) {
    theme = next === "night" ? "night" : "day";
    try { localStorage.setItem(themeKey, theme); } catch (_) {}
    paintTheme();
  }

  document.querySelectorAll("[data-language]").forEach(function (button) {
    button.addEventListener("click", function () { setLocale(button.getAttribute("data-language")); });
  });
  document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
    button.addEventListener("click", function () { setTheme(theme === "night" ? "day" : "night"); });
  });
  paintLocale();
  paintTheme();
  window.SiteLocale = { get: function () { return locale; }, set: setLocale };
})();
