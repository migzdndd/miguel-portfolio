(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const CASE_STUDIES = {
    "mfc-youth": {
      index: "01 / 04",
      title: "MFC Youth Area Management System",
      status: "Completed · Software Development",
      problem: "MFC Youth areas need a practical way to organize members, chapters, and service assignments without relying on an always-online system.",
      contribution: "Built an offline Windows desktop workflow around a centralized local SQLite database, with application packaging for easier installation.",
      technical: "The project combines C#, Windows Forms, SQLite, Git/GitHub, and Inno Setup into a complete local desktop application stack.",
      outcome: "A completed offline management application that turns multiple youth-area records and assignments into one structured local system.",
      tags: ["C#", "Windows Forms", "SQLite", "Git", "GitHub", "Inno Setup"],
      links: [{ label: "GitHub ↗", href: "https://github.com/migzdndd/MFC-Youth-Area-Management-System", external: true }]
    },
    "mytale-asia": {
      index: "02 / 04",
      title: "MyTale Asia — Hytale Development",
      status: "Completed · Server Development",
      problem: "A game server project needs more than code: server-side features, configuration, extensions, maintenance, and a workflow that keeps changes manageable.",
      contribution: "Worked on server-side development, mods, plugins, configuration, and ongoing maintenance while using Git and GitHub for version-controlled development.",
      technical: "Java is the core development language, supported by Git/GitHub and an iterative server configuration and testing workflow.",
      outcome: "A completed Hytale server development project that demonstrates hands-on work across both development and server operations concerns.",
      tags: ["Java", "Git", "GitHub", "OpenAI", "Server Configuration", "Plugin/Mod Work"],
      links: [{ label: "GitHub ↗", href: "https://github.com/Xerain556/MyTale-Asia-Development", external: true }]
    },
    "bitmon-smp": {
      index: "03 / 04",
      title: "BitMon SMP — Cobblemon Survival Server",
      status: "Ongoing · Minecraft Server Development",
      problem: "A modded multiplayer server has to keep gameplay features, configuration, plugins, mods, and technical reliability working together as the server evolves.",
      contribution: "As an Assistant Developer, I help build and improve server features, configure and maintain systems, troubleshoot technical issues, and support plugin/mod integration.",
      technical: "The work spans Java-adjacent server development, Cobblemon, server configuration, mod/plugin integration, Git/GitHub, and debugging workflows.",
      outcome: "An active multiplayer environment where development work is measured by stable integrations, maintainable configuration, and improved server features.",
      tags: ["Java", "Minecraft Server Development", "Cobblemon", "Server Configuration", "Mod/Plugin Integration", "Git", "GitHub", "Debugging"],
      links: []
    },
    "this-webpage": {
      index: "04 / 04",
      title: "This Webpage — Portfolio Website",
      status: "Completed · Web Development",
      problem: "A portfolio needs to communicate technical ability and personality without becoming a generic template or a static résumé page.",
      contribution: "Designed and built a responsive multi-page portfolio from scratch, including theming, navigation, page transitions, project interactions, custom cursor behavior, accessibility states, and reusable UI components.",
      technical: "The implementation uses semantic HTML, custom CSS, vanilla JavaScript, responsive layouts, LocalStorage for theme persistence, and progressively enhanced interactions.",
      outcome: "A complete portfolio system that doubles as a real web-development project and can evolve alongside future work.",
      tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "LocalStorage", "Accessibility"],
      links: [{ label: "View Website ↗", href: "index.html", external: false }]
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    enhanceMobileNavigation();
    initSpotlights();
    initCaseStudyModal();
    scrollToProjectFromHash();
  });

  function enhanceMobileNavigation() {
    const toggle = $("#mobileToggle");
    const panel = $("#controlPanel");
    if (!toggle || !panel) return;

    const setA11yState = () => {
      if (window.innerWidth > 820) {
        panel.removeAttribute("aria-hidden");
      } else if (!panel.classList.contains("open")) {
        panel.setAttribute("aria-hidden", "true");
      }
    };

    setA11yState();
    window.addEventListener("resize", setA11yState, { passive: true });

    document.addEventListener("keydown", event => {
      if (event.key !== "Escape" || !panel.classList.contains("open")) return;
      panel.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      panel.setAttribute("aria-hidden", "true");
      toggle.focus();
    });
  }

  function initSpotlights() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    $$('[data-spotlight]').forEach(card => {
      card.addEventListener("pointermove", event => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    });
  }

  function initCaseStudyModal() {
    const modal = $(".v2-modal");
    if (!modal) return;

    const panel = $(".modal-panel", modal);
    const title = $("#projectModalTitle", modal);
    const body = $("#projectModalBody", modal);
    const index = $("#v2ModalIndex", modal);
    const close = $(".modal-close", modal);
    let lastFocused = null;

    const render = id => {
      const data = CASE_STUDIES[id];
      if (!data) return false;

      title.textContent = data.title;
      index.textContent = data.index;

      const tags = data.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
      const links = data.links.map(link => {
        const attrs = link.external ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `<a class="btn btn-ghost magnetic" href="${link.href}"${attrs}>${escapeHtml(link.label)}</a>`;
      }).join("");

      body.innerHTML = `
        <p class="v2-project-status"><span class="dot" aria-hidden="true"></span>${escapeHtml(data.status)}</p>
        <div class="v2-modal-grid">
          ${modalSection("Problem", data.problem)}
          ${modalSection("My contribution", data.contribution)}
          ${modalSection("Technical approach", data.technical)}
          ${modalSection("Outcome", data.outcome)}
          <section class="v2-modal-section v2-modal-wide">
            <h3>Stack & systems</h3>
            <div class="pf-tags">${tags}</div>
          </section>
        </div>
        ${links ? `<div class="v2-modal-actions">${links}</div>` : ""}
      `;
      return true;
    };

    const openModal = id => {
      if (!render(id)) return;
      lastFocused = document.activeElement;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      window.setTimeout(() => close && close.focus(), 20);
    };

    const closeModal = () => {
      if (!modal.classList.contains("open")) return;
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    };

    $$('[data-v2-open]').forEach(button => {
      button.addEventListener("click", event => {
        event.stopPropagation();
        openModal(button.dataset.v2Open);
      });
    });

    $$('[data-v2-project]').forEach(card => {
      card.addEventListener("click", event => {
        if (event.target.closest("a, button")) return;
        openModal(card.dataset.v2Project);
      });
      card.addEventListener("keydown", event => {
        if ((event.key === "Enter" || event.key === " ") && !event.target.closest("a, button")) {
          event.preventDefault();
          openModal(card.dataset.v2Project);
        }
      });
    });

    close?.addEventListener("click", closeModal);
    modal.addEventListener("click", event => {
      if (event.target === modal) closeModal();
    });

    document.addEventListener("keydown", event => {
      if (!modal.classList.contains("open")) return;
      if (event.key === "Escape") {
        closeModal();
        return;
      }
      if (event.key !== "Tab") return;
      trapFocus(event, panel);
    });
  }

  function modalSection(title, text) {
    return `<section class="v2-modal-section"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></section>`;
  }

  function trapFocus(event, root) {
    const focusable = $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', root)
      .filter(el => !el.hasAttribute("hidden"));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function scrollToProjectFromHash() {
    if (!window.location.hash) return;
    const target = document.getElementById(window.location.hash.slice(1));
    if (!target) return;
    window.setTimeout(() => {
      target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
      target.focus({ preventScroll: true });
    }, 180);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
