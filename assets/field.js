(function () {
  "use strict";
  const steps = [
    {
      title: { zh: "扰动 / 具体经验", en: "Experience / point of departure" },
      question: { zh: "是什么具体的东西先撞到了你，让你非想不可？", en: "What concrete experience first made this question hard to ignore?" },
      note: { zh: "从具体经验开始，不是规定每篇作品都必须从个人经验出发；这里是在提醒：抽象说法需要交代它与材料的关系。", en: "Starting from experience is not a rule that every work must begin with personal experience. It is a reminder to explain how an abstract claim relates to material." },
      gap: { zh: "现场材料与问题之间的关系还需要交代。", en: "The link between the question and its material still needs explanation." }
    },
    {
      title: { zh: "跨学科照亮", en: "Another lens" },
      question: { zh: "你借用了哪个研究传统？借来的是方法、概念，还是已经成形的结论？", en: "Which research tradition are you drawing on: a method, a concept, or an already formed conclusion?" },
      note: { zh: "借用理论时，把适用范围和转换过程说出来。不同领域的概念不必被压成同一套话语。", en: "When borrowing theory, make its scope and translation visible. Concepts from different fields do not have to be forced into one vocabulary." },
      gap: { zh: "概念的来源、适用范围或转换过程尚未说明。", en: "The concept's source, scope, or translation remains unspecified." }
    },
    {
      title: { zh: "机制桥", en: "Mechanism" },
      question: { zh: "你提出的 A 是通过什么过程影响 B？中间环节在哪里？", en: "By what process does A affect B? What lies between them?" },
      note: { zh: "如果中间环节还没有材料支撑，可以把它保留为假设，而不是用流畅叙述填平空白。", en: "If the intermediate steps lack supporting material, keep them as hypotheses instead of filling the gap with fluent prose." },
      gap: { zh: "因果或机制链条还缺少说明与材料支持。", en: "The causal or mechanistic chain still needs explanation and supporting material." }
    },
    {
      title: { zh: "反例与异议", en: "Counterexample and dissent" },
      question: { zh: "有哪些材料或不同解释，会让当前说法需要调整？", en: "What evidence or alternative explanation could require this account to change?" },
      note: { zh: "反例不是固定格式的打卡项。它是提醒我们留下可能改变判断的材料，以及暂时无法消解的异议。", en: "A counterexample is not a box to tick. It is a reminder to preserve evidence that could change a judgment and dissent that remains unresolved." },
      gap: { zh: "暂时还没有写明哪些材料会改变当前判断。", en: "It is not yet clear what evidence would change the current judgment." }
    },
    {
      title: { zh: "暂定综合", en: "Provisional synthesis" },
      question: { zh: "这一步把哪些材料、解释和分歧放到一起？什么情况下你会改口？", en: "Which materials, interpretations, and disagreements does this synthesis bring together? What would make you revise it?" },
      note: { zh: "「暂定」不必制造新的完成标准。清楚记录判断的来源和可修改条件，就已经让它更容易被讨论。", en: "“Provisional” need not create another completion standard. Recording the source of a judgment and how it could change makes it easier to discuss." },
      gap: { zh: "综合判断的来源或可修改条件还需要写清楚。", en: "The basis or revisability of the synthesis still needs to be made clear." }
    },
    {
      title: { zh: "回到实践", en: "Return to practice" },
      question: { zh: "把这个解释带回具体任务或生活处境，它还能说明什么？", en: "When brought back to a concrete task or lived situation, what can this explanation still account for?" },
      note: { zh: "回到实践不是要求每个研究都交付一个工具。它让解释重新面对它涉及的人、制度和条件。", en: "Returning to practice does not mean every study must deliver a tool. It asks an explanation to face the people, institutions, and conditions it concerns." },
      gap: { zh: "解释与相关实践之间的关系还没有被检视。", en: "The relationship between the explanation and the relevant practice has not yet been examined." }
    }
  ];
  const wheel = document.getElementById("loop-wheel");
  const paths = document.getElementById("loop-paths");
  const count = document.getElementById("step-count");
  const title = document.getElementById("step-title");
  const question = document.getElementById("step-question");
  const note = document.getElementById("step-note");
  const state = document.getElementById("loop-state");
  const toggle = document.getElementById("fold-step");
  if (!wheel || !paths || !count || !title || !question || !note || !state || !toggle) return;

  const center = 280, radius = 207;
  const points = steps.map(function (_, index) {
    const angle = (-90 + index * 60) * Math.PI / 180;
    return { x: center + radius * Math.cos(angle), y: center + radius * Math.sin(angle) };
  });
  const segments = [];
  points.forEach(function (point, index) {
    const next = points[(index + 1) % points.length];
    const midX = (point.x + next.x) / 2;
    const midY = (point.y + next.y) / 2;
    const controlX = midX + (center - midX) * .2;
    const controlY = midY + (center - midY) * .2;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M " + point.x.toFixed(1) + " " + point.y.toFixed(1) + " Q " + controlX.toFixed(1) + " " + controlY.toFixed(1) + " " + next.x.toFixed(1) + " " + next.y.toFixed(1));
    paths.appendChild(path);
    segments.push(path);
  });
  let active = 0;
  const folded = new Set();
  const buttons = steps.map(function (step, index) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "loop-step";
    button.style.left = (points[index].x / 560 * 100) + "%";
    button.style.top = (points[index].y / 560 * 100) + "%";
    button.setAttribute("aria-pressed", String(index === active));
    button.setAttribute("aria-controls", "step-title");
    button.addEventListener("click", function () { active = index; render(); });
    wheel.appendChild(button);
    return button;
  });
  function render() {
    const locale = window.SiteLocale ? window.SiteLocale.get() : "zh";
    const step = steps[active];
    count.textContent = (locale === "zh" ? "提示 " : "PROMPT ") + "0" + String(active + 1) + " / 06";
    title.textContent = step.title[locale];
    question.textContent = step.question[locale];
    note.textContent = step.note[locale];
    toggle.textContent = folded.has(active)
      ? (locale === "zh" ? "恢复这个问题" : "Restore this prompt")
      : (locale === "zh" ? "暂时折叠这个问题" : "Fold this prompt for now");
    toggle.setAttribute("aria-pressed", String(folded.has(active)));
    buttons.forEach(function (button, index) {
      button.innerHTML = '<span class="step-no">0' + String(index + 1) + '</span>' + steps[index].title[locale].split(" / ")[0];
      button.setAttribute("aria-pressed", String(index === active));
      button.classList.toggle("is-cut", folded.has(index));
    });
    segments.forEach(function (segment, index) {
      segment.classList.toggle("is-cut", folded.has(index) || folded.has((index + 1) % steps.length));
    });
    const missing = Array.from(folded).sort(function (a, b) { return a - b; });
    if (!missing.length) {
      state.textContent = locale === "zh"
        ? "当前保留六个提示。论证是否充分，仍取决于具体材料和实际论证。"
        : "All six prompts are visible. Whether an argument is sufficient still depends on its material and reasoning.";
    } else {
      const names = missing.map(function (index) { return steps[index].title[locale].split(" / ")[0]; }).join(locale === "zh" ? "、" : ", ");
      state.textContent = locale === "zh"
        ? "暂时未处理：" + names + "。" + step.gap[locale] + "这只是提示缺口，不对整项研究作真假或有效性判断。"
        : "Temporarily unaddressed: " + names + ". " + step.gap[locale] + "This marks a gap; it does not judge the whole study as true, false, or valid.";
    }
  }
  toggle.addEventListener("click", function () {
    if (folded.has(active)) folded.delete(active); else folded.add(active);
    render();
  });
  document.addEventListener("site:localechange", render);
  render();
})();
