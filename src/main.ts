import "./style.css";
import { initCursorGlow } from "./cursorGlow";
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

function applyContent(): void {
  document.title = content.title;

  const meta = document.querySelector('meta[name="description"]');
  if (meta instanceof HTMLMetaElement) meta.content = content.description;

  setText("person-initials", content.initials);
  setText("person-role", content.role);
  setText("person-name", content.name);
  setHtml("hero-headline", content.heroHeadlineHtml);
  setText("hero-lede", content.heroLede);

  setLink("hero-email-link", `mailto:${content.email}`);
  setLink("contact-email-link", `mailto:${content.email}`);
  setText("email-text", content.email);

  setLink("footer-github", content.links.github);
  setLink("footer-linkedin", content.links.linkedin);
  setText("footer-note", content.footerNote);
}

function initDemoModal(): void {
  const dialog = document.getElementById("demo-modal");
  const iframe = document.getElementById("demo-modal-iframe");
  const titleEl = document.getElementById("demo-modal-title");
  const video = document.getElementById("demo-modal-video");
  const watchPlaceholder = document.getElementById("demo-watch-placeholder");

  if (!(dialog instanceof HTMLDialogElement)) return;
  if (!(iframe instanceof HTMLIFrameElement)) return;
  if (!(titleEl instanceof HTMLElement)) return;
  if (!(video instanceof HTMLIFrameElement)) return;
  if (!(watchPlaceholder instanceof HTMLElement)) return;

  const closeBtn = dialog.querySelector("[data-demo-close]");
  const clearFrames = (): void => {
    iframe.src = "about:blank";
    video.src = "about:blank";
  };

  const setTab = (tab: "try" | "watch"): void => {
    const tabs = dialog.querySelectorAll<HTMLElement>("[data-demo-tab]");
    const panels = dialog.querySelectorAll<HTMLElement>("[data-demo-panel]");

    tabs.forEach((t) => {
      const isActive = t.dataset.demoTab === tab;
      t.setAttribute("aria-selected", isActive ? "true" : "false");
      t.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((p) => {
      const isActive = p.dataset.demoPanel === tab;
      if (isActive) p.removeAttribute("hidden");
      else p.setAttribute("hidden", "");
    });
  };

  const setWatchUrl = (url?: string): void => {
    if (!url) {
      watchPlaceholder.hidden = false;
      video.hidden = true;
      video.src = "about:blank";
      return;
    }

    watchPlaceholder.hidden = true;
    video.hidden = false;
    video.src = url;
  };

  const open = (url: string, title: string, watchUrl?: string): void => {
    titleEl.textContent = title;
    iframe.src = url;
    setWatchUrl(watchUrl);
    setTab("try");
    dialog.showModal();
  };

  const close = (): void => {
    dialog.close();
  };

  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const btn = target.closest<HTMLElement>("[data-demo-url]");
    if (!btn) return;

    const url = btn.dataset.demoUrl;
    const title = btn.dataset.demoTitle ?? "Demo";
    const watchUrl = btn.dataset.demoWatchUrl;
    if (!url) return;

    open(url, title, watchUrl);
  });

  if (closeBtn instanceof HTMLElement) {
    closeBtn.addEventListener("click", () => {
      close();
    });
  }

  dialog.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    const tabBtn = target.closest<HTMLElement>("[data-demo-tab]");
    if (tabBtn) {
      const tab = tabBtn.dataset.demoTab;
      if (tab === "try" || tab === "watch") setTab(tab);
      return;
    }
  });

  dialog.addEventListener("close", () => {
    clearFrames();
  });

  dialog.addEventListener("cancel", () => {
    clearFrames();
  });

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) close();
  });
}

setFooterYear();
applyContent();
initCursorGlow();
initDemoModal();
