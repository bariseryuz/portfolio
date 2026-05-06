import { content } from "./content";

function setFooterYear(): void {
  const el = document.getElementById("y");
  if (el) el.textContent = String(new Date().getFullYear());
}

function setText(id: string, text: string): void {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setHtml(id: string, html: string): void {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function setLink(id: string, href: string, label?: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  if (!(el instanceof HTMLAnchorElement)) return;
  el.href = href;
  if (label) el.textContent = label;
}

export type ApplyContentPage = "home" | "resume";

export function applyContent(page: ApplyContentPage): void {
  const meta = document.querySelector('meta[name="description"]');

  if (page === "resume") {
    document.title = content.resumePage.title;
    if (meta instanceof HTMLMetaElement) meta.content = content.resumePage.description;
  } else {
    document.title = content.title;
    if (meta instanceof HTMLMetaElement) meta.content = content.description;
  }

  setText("person-initials", content.initials);
  setText("person-role", content.role);
  setText("person-name", content.name);

  if (page === "home") {
    setHtml("hero-headline", content.heroHeadlineHtml);
    setText("hero-lede", content.heroLede);
    setLink("hero-email-link", `mailto:${content.email}`);
    setLink("contact-email-link", `mailto:${content.email}`);
    setText("email-text", content.email);
  }

  setLink("footer-github", content.links.github);
  setLink("footer-linkedin", content.links.linkedin);
  setLink("resume-link", content.resume.href, content.resume.label);
  setText("footer-note", content.footerNote);
}

export function bootstrapSharedChrome(page: ApplyContentPage): void {
  setFooterYear();
  applyContent(page);
}
