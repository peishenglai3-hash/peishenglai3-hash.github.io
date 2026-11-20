(function () {
  "use strict";
  const records = [
    [92,61],[88,70],[85,82],[83,55],[81,74],
    [79,88],[77,66],[76,91],[74,59],[72,79],
    [70,85],[68,62],[66,93],[64,71],[62,58],
    [60,84],[58,76],[56,95],[54,68],[52,80]
  ];
  const board = document.getElementById("rank-board");
  const slider = document.getElementById("weight");
  const swapCount = document.getElementById("swap-count");
  const summary = document.getElementById("sim-summary");
  if (!board || !slider || !swapCount || !summary) return;

  const rowHeight = 28;
  const baseline = records.map(function (_, i) { return i; })
    .sort(function (a, b) { return records[b][0] - records[a][0]; }).slice(0, 5);
  const rows = records.map(function (_, i) {
    const row = document.createElement("div");
    row.className = "rank-row";
    row.setAttribute("role", "listitem");
    row.innerHTML = '<span class="rank-id"></span><span class="rank-track"><span class="rank-bar"></span></span><span class="rank-value"></span>';
    board.appendChild(row);
    return { root: row, id: row.querySelector(".rank-id"), bar: row.querySelector(".rank-bar"), value: row.querySelector(".rank-value") };
  });
  board.style.height = String(records.length * rowHeight) + "px";

  function render() {
    const weight = Number(slider.value) / 100;
    const locale = window.SiteLocale ? window.SiteLocale.get() : "zh";
    const scored = records.map(function (pair, i) { return { i: i, score: pair[0] * weight + pair[1] * (1 - weight) }; });
    scored.sort(function (a, b) { return b.score - a.score; });
    const rank = new Map(scored.map(function (item, index) { return [item.i, index]; }));
    const currentTop = scored.slice(0, 5).map(function (item) { return item.i; });
    rows.forEach(function (row, index) {
      const rankIndex = rank.get(index);
      const item = scored[rankIndex];
      row.root.style.transform = "translateY(" + String(rankIndex * rowHeight) + "px)";
      row.id.textContent = "S" + String(index + 1).padStart(2, "0");
      row.value.textContent = String(Math.round(item.score));
      row.bar.style.width = String(Math.max(2, item.score)) + "%";
      row.root.setAttribute("aria-current", String(currentTop.includes(index)));
      const zhLabel = "第 " + String(rankIndex + 1) + " 名，合成分 " + String(Math.round(item.score));
      const enLabel = "Rank " + String(rankIndex + 1) + ", synthetic score " + String(Math.round(item.score));
      row.root.setAttribute("aria-label", row.id.textContent + (locale === "zh" ? "，" + zhLabel : ", " + enLabel));
    });
    const stayed = currentTop.filter(function (index) { return baseline.includes(index); }).length;
    const changed = 5 - stayed;
    swapCount.textContent = String(changed) + " / 5";
    if (locale === "zh") {
      summary.textContent = changed === 0
        ? "名单没动。现在的排序与基准相同。"
        : "有 " + String(changed) + " 个位置发生变化。变化来自权重设置，不是对能力的新发现。";
    } else {
      summary.textContent = changed === 0
        ? "The list is unchanged from the baseline."
        : String(changed) + " top-five positions changed. This follows from the chosen weights; it is not a new finding about ability.";
    }
  }

  slider.addEventListener("input", render);
  document.querySelectorAll("[data-weight]").forEach(function (button) {
    button.addEventListener("click", function () { slider.value = button.dataset.weight; render(); });
  });
  document.addEventListener("site:localechange", render);
  render();
})();
