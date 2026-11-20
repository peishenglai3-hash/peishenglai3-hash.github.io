(function () {
  "use strict";
  const topics = {
    evaluation: {
      title: { zh: "评价与能力", en: "Evaluation and ability" },
      question: { zh: "评价工具怎样参与定义能力，又影响谁会被看见？", en: "How do evaluation tools help define ability—and shape who gets recognized?" },
      text: { zh: "这些项目把评价与研究协作的问题做成可操作的工具或小型演示。它们能展示设计选择的后果，不直接代替真实社会调查。", en: "These projects turn questions about evaluation and research collaboration into tools or small demonstrations. They show consequences of design choices; they do not replace social research." },
      links: [
        ["Open Possibility Lab", "https://github.com/peishenglai3-hash/open-possibility-lab"],
        ["评价装置沙盒", "../sandbox/"]
      ]
    },
    collaboration: {
      title: { zh: "人机协作", en: "Human–AI work" },
      question: { zh: "长期协作里，来源、失败、分歧和责任能不能留在记录中？", en: "Can provenance, failure, dissent, and responsibility remain visible in long-term collaboration?" },
      text: { zh: "Research Mode 已发布 v0.1.2。Praxis Runtime 是工程预览版；Praxis Loop 仍是原型，评估计划尚未执行。", en: "Research Mode has released v0.1.2. Praxis Runtime is an engineering preview; Praxis Loop remains a prototype with its evaluation plan not yet run." },
      links: [
        ["DSH Research Mode", "https://github.com/peishenglai3-hash/dsh-research-mode"],
        ["Praxis Runtime", "https://github.com/peishenglai3-hash/praxis-runtime"],
        ["Praxis Loop", "https://github.com/peishenglai3-hash/praxis-loop"]
      ]
    },
    education: {
      title: { zh: "教育与测量", en: "Education and measurement" },
      question: { zh: "考试、量表与调查如何影响哪些经验能被记录、比较和承认？", en: "How do exams, scales, and surveys shape which experiences can be recorded, compared, and recognized?" },
      text: { zh: "校园与社会调查方向的公开项目包括量表、数据工具和学习示例。项目用途与数据范围以各自 README 为准。", en: "Public work in this area includes a scale, data tools, and learning examples. See each repository README for intended use and data scope." },
      links: [
        ["ALIS 量表", "https://github.com/peishenglai3-hash/alis-ai-literacy-survey"],
        ["cohortlens", "https://github.com/peishenglai3-hash/cohortlens"],
        ["社小会", "https://github.com/peishenglai3-hash/she-xiao-hui"]
      ]
    },
    narrative: {
      title: { zh: "叙事与地方史", en: "Narrative and local history" },
      question: { zh: "一个地方的历史怎样通过人物、选择与空间变成可以进入的经验？", en: "How can local history become an experience entered through characters, choices, and place?" },
      text: { zh: "Honghu Chronicles 是已归档的 Phaser 叙事游戏项目，保存序章至第四章的可玩基线。本页仅作介绍，没有在本次主页更新中更改游戏仓库或重跑回归。", en: "Honghu Chronicles is an archived Phaser narrative game, preserving the playable prologue-to-chapter-four baseline. This page only describes it; the game repository was not changed or regression-tested here." },
      links: [["Honghu Chronicles", "https://github.com/peishenglai3-hash/honghu-chronicles"]]
    }
  };
  const buttons = Array.from(document.querySelectorAll("[data-topic]"));
  const kicker = document.getElementById("topic-kicker");
  const title = document.getElementById("topic-title");
  const question = document.getElementById("topic-question");
  const text = document.getElementById("topic-text");
  const links = document.getElementById("topic-links");
  let active = "evaluation";
  function render() {
    const locale = window.SiteLocale ? window.SiteLocale.get() : "zh";
    const topic = topics[active];
    kicker.textContent = "QUESTION 0" + (Object.keys(topics).indexOf(active) + 1);
    title.textContent = topic.title[locale];
    question.textContent = topic.question[locale];
    text.textContent = topic.text[locale];
    links.replaceChildren();
    topic.links.forEach(function (entry) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = entry[1];
      a.textContent = entry[0] + " ↗";
      if (entry[1].startsWith("https://")) { a.target = "_blank"; a.rel = "noreferrer"; }
      li.appendChild(a);
      links.appendChild(li);
    });
    buttons.forEach(function (button) { button.setAttribute("aria-pressed", String(button.dataset.topic === active)); });
  }
  buttons.forEach(function (button) {
    button.addEventListener("click", function () { active = button.dataset.topic; render(); });
  });
  document.addEventListener("site:localechange", render);
  render();
})();
