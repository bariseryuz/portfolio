import "./style.css";
import { initCursorGlow } from "./cursorGlow";
import { bootstrapSharedChrome } from "./applyContent";

const TAB_LABEL_TRY = "Try demo";
const TAB_LABEL_WATCH = "Watch the demo";

function mimeForPath(path: string): string {
  const base = path.split("?")[0]?.toLowerCase() ?? "";
  if (base.endsWith(".mp4") || base.endsWith(".m4v")) return "video/mp4";
  if (base.endsWith(".webm")) return "video/webm";
  if (base.endsWith(".mov")) return "video/quicktime";
  return "";
}

function isMp4Path(path: string): boolean {
  return (path.split("?")[0]?.toLowerCase() ?? "").endsWith(".mp4");
}

/** Avoid listing missing files as <source> — a 404 on the first source can stop playback entirely. */
async function urlReachable(path: string): Promise<boolean> {
  try {
    const head = await fetch(path, { method: "HEAD", cache: "no-store" });
    if (head.ok) return true;
    if (head.status === 404) return false;
  } catch {
    /* continue */
  }
  try {
    const get = await fetch(path, {
      method: "GET",
      cache: "no-store",
      headers: { Range: "bytes=0-0" },
    });
    return get.ok || get.status === 206;
  } catch {
    return false;
  }
}

/**
 * Prefer a reachable H.264 MP4 alone; otherwise use .mov (may be audio-only in Chrome).
 */
async function pickVideoSources(primary?: string, fallback?: string): Promise<string[]> {
  const candidates = [...new Set([primary, fallback].filter((x): x is string => Boolean(x)))];
  const reachable: string[] = [];
  for (const p of candidates) {
    if (await urlReachable(p)) reachable.push(p);
  }
  const use = reachable.length > 0 ? reachable : candidates;
  const mp4 = use.find((p) => isMp4Path(p));
  if (mp4) return [mp4];
  return use;
}

function applyNativeSources(video: HTMLVideoElement, paths: string[]): void {
  video.pause();
  video.removeAttribute("src");
  video.replaceChildren();
  for (const p of paths) {
    if (!p) continue;
    const s = document.createElement("source");
    s.src = p;
    const t = mimeForPath(p);
    if (t) s.type = t;
    video.appendChild(s);
  }
  video.load();
}

function initDemoModal(): void {
  const dialog = document.getElementById("demo-modal");
  const iframe = document.getElementById("demo-modal-iframe");
  const titleEl = document.getElementById("demo-modal-title");
  const watchIframe = document.getElementById("demo-modal-video");
  const watchPlaceholder = document.getElementById("demo-watch-placeholder");
  const nativeVideo = document.getElementById("demo-modal-native-video");
  const tabsRow = document.getElementById("demo-modal-tabs");
  const tabTry = document.getElementById("demo-tab-try");
  const tabWatch = document.getElementById("demo-tab-watch");
  const noteTry = document.getElementById("demo-modal-note-try");
  const noteWatch = document.getElementById("demo-modal-note-watch");

  if (!(dialog instanceof HTMLDialogElement)) return;
  if (!(iframe instanceof HTMLIFrameElement)) return;
  if (!(watchIframe instanceof HTMLIFrameElement)) return;
  if (!(nativeVideo instanceof HTMLVideoElement)) return;
  if (!(titleEl instanceof HTMLElement)) return;
  if (!(watchPlaceholder instanceof HTMLElement)) return;
  if (!(tabsRow instanceof HTMLElement)) return;
  if (!(tabTry instanceof HTMLElement)) return;
  if (!(tabWatch instanceof HTMLElement)) return;
  if (!(noteTry instanceof HTMLElement)) return;
  if (!(noteWatch instanceof HTMLElement)) return;

  const closeBtn = dialog.querySelector("[data-demo-close]");

  const defaultNoteTry = noteTry.textContent ?? "";
  const defaultNoteWatch = noteWatch.textContent ?? "";

  const clearNativeVideo = (): void => {
    nativeVideo.pause();
    nativeVideo.removeAttribute("src");
    nativeVideo.replaceChildren();
    nativeVideo.load();
    nativeVideo.hidden = true;
  };

  const clearFrames = (): void => {
    iframe.src = "about:blank";
    watchIframe.src = "about:blank";
    clearNativeVideo();
    iframe.hidden = false;
    watchPlaceholder.hidden = false;
    watchIframe.hidden = true;
    tabTry.textContent = TAB_LABEL_TRY;
    tabWatch.textContent = TAB_LABEL_WATCH;
    tabsRow.hidden = false;
    tabWatch.hidden = false;
    noteTry.textContent = defaultNoteTry;
    noteWatch.textContent = defaultNoteWatch;
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
      watchIframe.hidden = true;
      watchIframe.src = "about:blank";
      return;
    }

    watchPlaceholder.hidden = true;
    watchIframe.hidden = false;
    watchIframe.src = url;
  };

  const openEmbed = (siteUrl: string, title: string, watchUrl?: string): void => {
    titleEl.textContent = title;
    clearNativeVideo();
    iframe.hidden = false;
    iframe.src = siteUrl;
    setWatchUrl(watchUrl);
    tabTry.textContent = TAB_LABEL_TRY;
    tabWatch.textContent = TAB_LABEL_WATCH;
    tabsRow.hidden = false;
    tabWatch.hidden = false;
    noteTry.textContent = defaultNoteTry;
    noteWatch.textContent = defaultNoteWatch;
    setTab("try");
    dialog.showModal();
  };

  /** If MP4 is corrupt, try the .mov once on error (decode / container issues). */
  const attachMovFallbackOnMp4Error = (sources: string[], movPath?: string): void => {
    if (!movPath || sources.length !== 1 || !isMp4Path(sources[0] ?? "")) return;
    const handler = (): void => {
      void urlReachable(movPath).then((ok) => {
        if (ok) applyNativeSources(nativeVideo, [movPath]);
      });
    };
    nativeVideo.addEventListener("error", handler, { once: true });
  };

  const openNativeWithSite = (
    title: string,
    sources: string[],
    siteUrl: string,
    movFallbackPath?: string,
  ): void => {
    titleEl.textContent = title;
    iframe.src = "about:blank";
    iframe.hidden = true;
    applyNativeSources(nativeVideo, sources);
    attachMovFallbackOnMp4Error(sources, movFallbackPath);
    nativeVideo.hidden = false;
    watchPlaceholder.hidden = true;
    watchIframe.hidden = false;
    watchIframe.src = siteUrl;
    tabTry.textContent = "Watch video";
    tabWatch.textContent = "Try live site";
    tabsRow.hidden = false;
    tabWatch.hidden = false;
    noteTry.textContent =
      "Screen recordings: run ./encode-demo-video.sh for a small H.264 MP4 (works in all browsers). .mov alone often plays audio-only outside Safari.";
    noteWatch.textContent =
      "If the embed is blocked by browser or site settings, use “Open Shiiman Leads” on the card instead.";
    setTab("try");
    dialog.showModal();
  };

  const openNativeOnly = (title: string, sources: string[], movFallbackPath?: string): void => {
    titleEl.textContent = title;
    iframe.src = "about:blank";
    iframe.hidden = true;
    applyNativeSources(nativeVideo, sources);
    attachMovFallbackOnMp4Error(sources, movFallbackPath);
    nativeVideo.hidden = false;
    setWatchUrl(undefined);
    tabTry.textContent = "Watch video";
    tabsRow.hidden = true;
    noteTry.textContent =
      "Run ./encode-demo-video.sh to add an H.264 MP4. Without it, .mov may not play picture (or at all) in Chrome.";
    setTab("try");
    dialog.showModal();
  };

  const close = (): void => {
    dialog.close();
  };

  document.addEventListener("click", (e) => {
    void (async () => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      const btn = target.closest<HTMLElement>("[data-demo-url], [data-demo-video]");
      if (!btn) return;

      const title = btn.dataset.demoTitle ?? "Demo";
      const nativeSrc = btn.dataset.demoVideo?.trim();
      const nativeFallback = btn.dataset.demoVideoFallback?.trim();
      const url = btn.dataset.demoUrl?.trim();
      const watchUrl = btn.dataset.demoWatchUrl?.trim();

      if (nativeSrc) {
        const sources = await pickVideoSources(nativeSrc, nativeFallback);
        if (url) openNativeWithSite(title, sources, url, nativeFallback);
        else openNativeOnly(title, sources, nativeFallback);
        return;
      }

      if (!url) return;
      openEmbed(url, title, watchUrl);
    })();
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

bootstrapSharedChrome("home");
initCursorGlow();
initDemoModal();
