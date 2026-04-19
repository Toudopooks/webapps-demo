// Edit this array to add, remove, or reorder projects.
// Each project: { name, description, url, repo, icon, tags, status }
// status: "live" | "wip" | "paused"
const projects = [
  {
    name: "Project One",
    description: "A short, punchy description of what this project does and why it's cool.",
    url: "https://project-one.vercel.app",
    repo: "https://github.com/your-username/project-one",
    icon: "✨",
    tags: ["nextjs", "ai", "web"],
    status: "live",
  },
  {
    name: "Project Two",
    description: "Another thing you've built. Keep it one or two sentences max.",
    url: "https://project-two.vercel.app",
    repo: "https://github.com/your-username/project-two",
    icon: "🚀",
    tags: ["react", "vercel"],
    status: "live",
  },
  {
    name: "Lab Experiment",
    description: "Small weekend experiment. Might break. Definitely fun.",
    url: "https://lab.vercel.app",
    repo: "https://github.com/your-username/lab",
    icon: "🧪",
    tags: ["experiment", "web"],
    status: "wip",
  },
  {
    name: "Mini Tool",
    description: "A tiny utility that solves one problem really well.",
    url: "https://mini-tool.vercel.app",
    repo: "https://github.com/your-username/mini-tool",
    icon: "🛠️",
    tags: ["tool", "web"],
    status: "live",
  },
  {
    name: "Archived Project",
    description: "Sunsetted, but still fun to look at. Left here for history.",
    url: "https://archived.vercel.app",
    repo: "https://github.com/your-username/archived",
    icon: "📦",
    tags: ["archive"],
    status: "paused",
  },
];

// ---------- Helpers ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === null || v === false) continue;
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else if (k === "dataset") {
      for (const [dk, dv] of Object.entries(v)) node.dataset[dk] = dv;
    } else node.setAttribute(k, v);
  }
  for (const c of [].concat(children)) {
    if (c == null || c === false) continue;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return node;
}

function clear(n) {
  while (n.firstChild) n.removeChild(n.firstChild);
}

// ---------- State ----------
const grid = $("#projects");
const empty = $("#empty");
const search = $("#search");
const chipsRoot = $("#chips");

let activeTag = "all";
let activeQuery = "";

// ---------- Rendering ----------
function renderChips() {
  const tagCounts = new Map();
  projects.forEach((p) => p.tags.forEach((t) => tagCounts.set(t, (tagCounts.get(t) || 0) + 1)));
  const tags = ["all", ...Array.from(tagCounts.keys()).sort()];

  clear(chipsRoot);
  tags.forEach((t) => {
    const label = t === "all" ? "all" : `#${t}`;
    const children = [label];
    if (t !== "all") {
      const count = el("span", { style: "opacity:.6; margin-left:4px;" }, [String(tagCounts.get(t))]);
      children.push(" ", count);
    }
    const chip = el(
      "button",
      {
        class: "chip",
        role: "tab",
        dataset: { tag: t },
        "aria-pressed": t === activeTag ? "true" : "false",
        onclick: () => {
          activeTag = t;
          $$(".chip", chipsRoot).forEach((x) =>
            x.setAttribute("aria-pressed", x.dataset.tag === activeTag ? "true" : "false")
          );
          renderCards();
        },
      },
      children
    );
    chipsRoot.appendChild(chip);
  });
}

function statusLabel(s) {
  if (s === "live") return "● live";
  if (s === "wip") return "● wip";
  if (s === "paused") return "● paused";
  return s;
}

function buildCard(p) {
  const icon = el("div", { class: "card__icon", "aria-hidden": "true" }, [p.icon || "•"]);
  const status = el(
    "span",
    { class: "card__status", dataset: { status: p.status } },
    [statusLabel(p.status)]
  );
  const head = el("div", { class: "card__head" }, [icon, status]);

  const title = el("h3", { class: "card__title" }, [p.name]);
  const desc = el("p", { class: "card__desc" }, [p.description]);

  const tagsWrap = el(
    "div",
    { class: "tags" },
    p.tags.map((t) => el("span", { class: "tag" }, [`#${t}`]))
  );

  const liveLink = el(
    "a",
    { class: "card__link card__link--primary", href: p.url, target: "_blank", rel: "noreferrer" },
    ["live ↗"]
  );
  const linkChildren = [liveLink];
  if (p.repo) {
    linkChildren.push(
      el(
        "a",
        { class: "card__link card__link--ghost", href: p.repo, target: "_blank", rel: "noreferrer" },
        ["code"]
      )
    );
  }
  const links = el("div", { class: "card__links" }, linkChildren);

  return el("article", { class: "card" }, [head, title, desc, tagsWrap, links]);
}

function renderCards() {
  const q = activeQuery.trim().toLowerCase();
  const filtered = projects.filter((p) => {
    const tagMatch = activeTag === "all" || p.tags.includes(activeTag);
    const qMatch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q));
    return tagMatch && qMatch;
  });

  empty.hidden = filtered.length > 0;
  clear(grid);
  filtered.forEach((p) => grid.appendChild(buildCard(p)));
}

// ---------- Events ----------
search.addEventListener("input", (e) => {
  activeQuery = e.target.value;
  renderCards();
});

const cat = document.querySelector(".title__cat");
if (cat) {
  cat.addEventListener("click", () => {
    cat.textContent = cat.textContent === "🐱" ? "😸" : "🐱";
  });
}

$("#year").textContent = new Date().getFullYear();

renderChips();
renderCards();
