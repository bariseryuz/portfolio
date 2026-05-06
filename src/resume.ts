import "./style.css";
import "./resume.css";
import { initCursorGlow } from "./cursorGlow";
import { content } from "./content";
import { bootstrapSharedChrome } from "./applyContent";

function escapeHtml(text: string): string {
  const el = document.createElement("div");
  el.textContent = text;
  return el.innerHTML;
}

function escapeAttr(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function renderCv(): void {
  const { cv, email, links, name } = content;

  const nameEl = document.getElementById("cv-name");
  if (nameEl) nameEl.textContent = name;

  const summaryEl = document.getElementById("cv-summary");
  if (summaryEl) summaryEl.textContent = cv.summary;

  const meta = document.getElementById("cv-meta-line");
  if (meta) {
    const telHref = `tel:${cv.phone.replace(/\s/g, "")}`;
    const ext = 'target="_blank" rel="noopener noreferrer"';
    const loc = cv.location.trim();
    const lines: string[] = [];
    if (loc) lines.push(`<p class="resume-contact-line">${escapeHtml(loc)}</p>`);
    lines.push(
      `<p class="resume-contact-line"><a href="${escapeAttr(telHref)}">${escapeHtml(cv.phone)}</a></p>`,
      `<p class="resume-contact-line"><a href="mailto:${escapeAttr(email)}">${escapeHtml(email)}</a></p>`,
      `<p class="resume-contact-line"><a href="${escapeAttr(links.linkedin)}" ${ext}>LinkedIn</a></p>`,
      `<p class="resume-contact-line"><a href="${escapeAttr(links.github)}" ${ext}>GitHub</a></p>`,
    );
    meta.innerHTML = lines.join("");
  }

  const buildExperienceArticle = (exp: (typeof cv.experience)[number]): string => {
    const logos = (exp.logos ?? [])
      .map(
        (src) =>
          `<img class="resume-client-logo" src="${escapeAttr(src)}" alt="" loading="lazy" decoding="async" />`,
      )
      .join("");
    const logoRow = logos
      ? `<div class="resume-exp-logos" aria-label="Brands">${logos}</div>`
      : "";
    const note = exp.metaNote
      ? `<p class="resume-card-meta-note">${escapeHtml(exp.metaNote)}</p>`
      : "";
    return `
        <article class="card resume-exp-card">
          ${logoRow}
          <h3>${escapeHtml(exp.title)}</h3>
          <div class="resume-exp-meta">
            <p class="resume-card-meta-period"><span>${escapeHtml(exp.dateRange)}</span></p>
            <p class="resume-card-meta-line2">${escapeHtml(exp.company)} · ${escapeHtml(exp.location)}</p>
            ${note}
          </div>
          <ul class="plain-list">
            ${exp.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
          </ul>
        </article>`;
  };

  const expBox = document.getElementById("cv-experience-entries");
  if (expBox) {
    expBox.innerHTML = cv.experience
      .map((exp) => `<li>${buildExperienceArticle(exp)}</li>`)
      .join("");
  }

  const eduBox = document.getElementById("cv-education-entries");
  if (eduBox) {
    eduBox.innerHTML = cv.education
      .map((ed) => {
        const detail = ed.detail
          ? `<p class="resume-edu-detail">${escapeHtml(ed.detail)}</p>`
          : "";
        const dates = ed.dateRange.trim();
        const meta = dates
          ? `${escapeHtml(ed.location)} · ${escapeHtml(dates)}`
          : escapeHtml(ed.location);
        const logo = ed.logo
          ? `<img class="resume-edu-logo" src="${escapeAttr(ed.logo)}" alt="${escapeAttr(ed.institution)} logo" loading="lazy" decoding="async" />`
          : "";
        return `
      <div class="resume-edu-block-inner">
        ${logo}
        <div class="resume-edu-text">
          <h3 class="subsection-title">${escapeHtml(ed.institution)}</h3>
          <p class="link-meta">${meta}</p>
          <p class="resume-edu-degree">${escapeHtml(ed.degree)}</p>
          ${detail}
        </div>
      </div>`;
      })
      .join("");
  }

  const skillsRoot = document.getElementById("cv-skills-root");
  if (skillsRoot) {
    skillsRoot.innerHTML = cv.skillGroups
      .map(
        (g) => `
      <div class="resume-skill-group">
        <h3 class="subsection-title resume-skill-group-title">${escapeHtml(g.title)}</h3>
        <ul class="tags resume-skill-group-tags" role="list">
          ${g.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </div>`,
      )
      .join("");
  }
}

function wireResumeActions(): void {
  const link = document.getElementById("resume-link");
  if (link instanceof HTMLAnchorElement) {
    const raw = link.getAttribute("href") ?? "#";
    const isPrint = raw === "" || raw === "#";
    if (isPrint) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        window.print();
      });
    }
  }
}

bootstrapSharedChrome("resume");
renderCv();
wireResumeActions();
initCursorGlow();
