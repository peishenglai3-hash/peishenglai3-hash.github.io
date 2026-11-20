(function () {
  "use strict";
  const projects = {
    "research-mode": {
      title: "DSH Research Mode",
      meta: { zh: "工程发布 · v0.1.2 · 2026-11-11", en: "Engineering release · v0.1.2 · 2026-11-11" },
      description: {
        zh: "面向 DeepSeek Harness 的证据优先科研工作流，围绕研究产物及其来源记录设计。",
        en: "An evidence-first research workflow for DeepSeek Harness, designed around artifacts and their provenance."
      },
      boundary: {
        zh: "边界：不替代研究判断、同行评审或真实材料解释。",
        en: "Limit: it does not replace research judgment, peer review, or interpretation of real-world materials."
      },
      href: "https://github.com/peishenglai3-hash/dsh-research-mode"
    },
    "open-possibility-lab": {
      title: "Open Possibility Lab",
      meta: { zh: "研究原型 · 合成证据", en: "Research prototype · synthetic evidence" },
      description: {
        zh: "探索来源可追溯、分歧可保留、结论可以重开的研究协作工作区。",
        en: "A research collaboration workspace exploring traceable sources, preserved dissent, and reopenable conclusions."
      },
      boundary: {
        zh: "边界：目前仅有合成材料上的结构证据，不声称真实用户收益或生产可用性。",
        en: "Limit: current structural evidence uses synthetic material; real-user benefit and production readiness are unestablished."
      },
      href: "https://github.com/peishenglai3-hash/open-possibility-lab"
    },
    "praxis-loop": {
      title: "Praxis Loop",
      meta: { zh: "本地原型 · 评估尚未执行", en: "Local prototype · evaluation not yet run" },
      description: {
        zh: "面向可修订人机任务决策的本地优先运行时原型。",
        en: "A local-first runtime prototype for revisable human–AI task decisions."
      },
      boundary: {
        zh: "边界：评估方案仍待执行，不把单次代码任务表现推广为一般能力。",
        en: "Limit: the evaluation plan remains unrun; a single bounded coding task is not generalized into a claim of broad capability."
      },
      href: "https://github.com/peishenglai3-hash/praxis-loop"
    },
    "honghu-chronicles": {
      title: "Honghu Chronicles",
      meta: { zh: "已归档 · 序章至第四章基线", en: "Archived · prologue-to-chapter-four baseline" },
      description: {
        zh: "Phaser 叙事游戏项目，以像素互动形式呈现洪湖篇章。",
        en: "A Phaser narrative game project presenting the Honghu chapters through pixel-art interaction."
      },
      boundary: {
        zh: "边界：当前主页只介绍归档状态；未在本次更新中改动或重新回归游戏。",
        en: "Limit: this page describes the archived state; the game was not changed or regression-tested during this update."
      },
      href: "https://github.com/peishenglai3-hash/honghu-chronicles"
    }
  };

  const buttons = Array.from(document.querySelectorAll("[data-project]"));
  const meta = document.getElementById("project-meta");
  const name = document.getElementById("project-name");
  const description = document.getElementById("project-description");
  const boundary = document.getElementById("project-boundary");
  const link = document.getElementById("project-link");
  const section = document.getElementById("projects");
  if (!meta || !name || !description || !boundary || !link) return;

  let activeId = "research-mode";
  function render() {
    const project = projects[activeId];
    const locale = window.SiteLocale ? window.SiteLocale.get() : "zh";
    meta.textContent = project.meta[locale];
    name.textContent = project.title;
    description.textContent = project.description[locale];
    boundary.textContent = project.boundary[locale];
    link.href = project.href;
    buttons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.project === activeId));
    });
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      activeId = button.dataset.project;
      render();
      if (button.classList.contains("project-pin")) {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        section.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      }
    });
  });
  document.addEventListener("site:localechange", render);
  render();
})();
