/* Personal webpage behaviour - typed hero effect + skill bars */
"use strict";

/* --- typed effect in the hero heading --- */
const phrases = [
  "networking",
  "distributed computing",
  "machine learning",
  "data engineering",
];
let phraseIndex = 0, charIndex = 0, deleting = false;
const typeTarget = document.createElement("span");
typeTarget.className = "accent";
document.querySelector("h1").append(" I work with ");
document.querySelector("h1").append(typeTarget);

function typeLoop() {
  const phrase = phrases[phraseIndex];
  if (!deleting) {
    typeTarget.textContent = phrase.slice(0, ++charIndex);
    if (charIndex === phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
    setTimeout(typeLoop, 90);
  } else {
    typeTarget.textContent = phrase.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    setTimeout(typeLoop, 45);
  }
}
typeLoop();

/* --- skill bars, filled from a data array --- */
const skills = [
  { name: "Python", level: 90 },
  { name: "Networking / TCP-IP", level: 80 },
  { name: "Distributed Systems (Hadoop, Spark)", level: 75 },
  { name: "Machine Learning (MLlib, scikit-learn)", level: 70 },
  { name: "SQL / PostgreSQL", level: 75 },
  { name: "Git / Linux", level: 70 },
];

const grid = document.getElementById("skills-grid");
skills.forEach((s) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML =
    `<h3>${s.name}</h3>` +
    `<div class="bar"><div class="bar-fill" style="width:0"></div></div>` +
    `<span class="bar-label">${s.level}%</span>`;
  grid.appendChild(card);

  /* animate the bar after the card is visible */
  const fill = card.querySelector(".bar-fill");
  setTimeout(() => { fill.style.width = s.level + "%"; }, 200);
});

/* --- footer year --- */
document.querySelector("footer p").textContent =
  `© ${new Date().getFullYear()} Your Name · hosted on GitHub Pages`;
