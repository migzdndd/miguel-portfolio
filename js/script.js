(() => {

  "use strict";


  /* =======================================================
     HELPERS
     ======================================================= */

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  const $$ = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));


  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;


  /* =======================================================
     DOM READY
     ======================================================= */

  document.addEventListener(
    "DOMContentLoaded",
    () => {

      document.body.classList.toggle(
        "touch",
        isTouchDevice
      );


      initTheme();

      initMobileMenu();

      initActiveNavigation();

      initPageTransitions();

      initSequentialReveal();

      initInterfaceIcons();

      initCursor();

      initSkills();

      initAccordions();

      initArchitecture();

      initProjectModal();

      initContactInteractions();

      initLoader();

    }
  );


  /* =======================================================
     THEME
     ======================================================= */

  function initTheme() {

    const toggle =
      $(".theme-toggle");

    if (!toggle) {
      return;
    }


    const storedTheme =
      localStorage.getItem(
        "portfolio-theme"
      );


    const currentTheme =
      storedTheme ||
      (
        window.matchMedia &&
          window.matchMedia(
            "(prefers-color-scheme: light)"
          ).matches
          ? "light"
          : "dark"
      );


    applyTheme(
      currentTheme,
      false
    );


    toggle.addEventListener(
      "click",
      () => {

        const current =
          document.documentElement
            .getAttribute(
              "data-theme"
            ) || "dark";


        const next =
          current === "dark"
            ? "light"
            : "dark";


        applyTheme(
          next,
          true
        );

      }
    );

  }


  function applyTheme(
    theme,
    persist = true
  ) {

    document.documentElement.setAttribute(
      "data-theme",
      theme
    );


    if (persist) {

      localStorage.setItem(
        "portfolio-theme",
        theme
      );

    }


    updateThemeToggle(
      theme
    );

  }


  function updateThemeToggle(
    theme
  ) {

    const toggle =
      $(".theme-toggle");

    if (!toggle) {
      return;
    }


    const isDark =
      theme === "dark";


    toggle.setAttribute(
      "aria-label",
      isDark
        ? "Switch to light mode"
        : "Switch to dark mode"
    );


    toggle.setAttribute(
      "title",
      isDark
        ? "Switch to light mode"
        : "Switch to dark mode"
    );


    toggle.setAttribute(
      "aria-pressed",
      isDark
        ? "true"
        : "false"
    );


    toggle.innerHTML =
      isDark

        ? `
          <svg
            class="icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <circle
              cx="12"
              cy="12"
              r="4.5"
              fill="currentColor"
            ></circle>

            <path
              d="
                M12 2.5v2.25
                M12 19.25v2.25
                M4.58 4.58l1.59 1.59
                M17.83 17.83l1.59 1.59
                M2.5 12h2.25
                M19.25 12h2.25
                M4.58 19.42l1.59-1.59
                M17.83 6.17l1.59-1.59
              "
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            ></path>
          </svg>
        `

        : `
          <svg
            class="icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="
                M20.3 15.1
                A8.5 8.5 0 0 1
                8.9 3.7
                A8.7 8.7 0 1 0
                20.3 15.1Z
              "
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        `;

  }


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  function initMobileMenu() {

    const toggle =
      $(".mobile-toggle");

    const panel =
      $(".control-panel");

    if (!toggle || !panel) {
      return;
    }


    toggle.addEventListener(
      "click",
      () => {

        const open =
          panel.classList.toggle(
            "open"
          );


        toggle.classList.toggle(
          "open",
          open
        );


        toggle.setAttribute(
          "aria-expanded",
          String(open)
        );


        panel.setAttribute(
          "aria-hidden",
          String(!open)
        );

      }
    );


    $$(".control-panel a").forEach(
      link => {

        link.addEventListener(
          "click",
          () => {

            if (
              window.innerWidth >
              820
            ) {
              return;
            }


            panel.classList.remove(
              "open"
            );

            toggle.classList.remove(
              "open"
            );

            toggle.setAttribute(
              "aria-expanded",
              "false"
            );

            panel.setAttribute(
              "aria-hidden",
              "true"
            );

          }
        );

      }
    );


    window.addEventListener(
      "resize",
      () => {

        if (
          window.innerWidth >
          820
        ) {

          panel.classList.remove(
            "open"
          );

          toggle.classList.remove(
            "open"
          );

          toggle.setAttribute(
            "aria-expanded",
            "false"
          );

          panel.removeAttribute(
            "aria-hidden"
          );

        }

      }
    );

  }


  /* =======================================================
     ACTIVE NAVIGATION
     ======================================================= */

  function initActiveNavigation() {

    const links =
      $$(".nav-list a");

    if (!links.length) {
      return;
    }


    const current =
      window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();


    const page =
      current || "index.html";


    links.forEach(
      link => {

        const href =
          link.getAttribute(
            "href"
          );

        if (!href) {
          return;
        }


        const normalized =
          href
            .split("/")
            .pop()
            .split("#")[0]
            .toLowerCase();


        const isCurrent =
          (
            page === normalized
          ) ||
          (
            page === "" &&
            normalized === "index.html"
          );


        link.classList.toggle(
          "page-link-current",
          isCurrent
        );


        if (isCurrent) {

          link.setAttribute(
            "aria-current",
            "page"
          );

        }
        else {

          link.removeAttribute(
            "aria-current"
          );

        }

      }
    );

  }


  /* =======================================================
     PAGE TRANSITIONS
     ======================================================= */

  function initPageTransitions() {

    const transition =
      $("#pageTransition");

    if (!transition) {
      return;
    }


    if (prefersReducedMotion) {

      document.body.classList.remove(
        "page-entering",
        "page-leaving"
      );

      return;

    }


    requestAnimationFrame(
      () => {

        document.body.classList.add(
          "page-entering"
        );

      }
    );


    window.setTimeout(
      () => {

        document.body.classList.remove(
          "page-entering"
        );

      },
      760
    );


    $$(".nav-list a").forEach(
      link => {

        link.addEventListener(
          "click",
          event => {

            const href =
              link.getAttribute(
                "href"
              );

            if (!href) {
              return;
            }


            if (
              href.startsWith("#") ||
              href.startsWith("mailto:") ||
              href.startsWith("tel:")
            ) {
              return;
            }


            if (
              event.ctrlKey ||
              event.metaKey ||
              event.shiftKey ||
              event.altKey ||
              event.button !== 0
            ) {
              return;
            }


            const target =
              new URL(
                href,
                window.location.href
              );


            if (
              target.origin !==
              window.location.origin
            ) {
              return;
            }


            if (
              target.pathname ===
              window.location.pathname
            ) {
              return;
            }


            event.preventDefault();


            document.body.classList.remove(
              "page-entering"
            );

            document.body.classList.add(
              "page-leaving"
            );


            window.setTimeout(
              () => {

                window.location.href =
                  target.href;

              },
              prefersReducedMotion
                ? 0
                : 420
            );

          }
        );

      }
    );

  }


  /* =======================================================
     SEQUENTIAL PAGE REVEAL
     ======================================================= */

  function initSequentialReveal() {

    const elements =
      $$(".page-reveal");

    if (!elements.length) {
      return;
    }


    if (prefersReducedMotion) {

      elements.forEach(
        element => {

          element.classList.add(
            "is-visible"
          );

        }
      );

      return;

    }


    elements.forEach(
      (element, index) => {

        if (
          !element.style
            .getPropertyValue(
              "--reveal-delay"
            )
        ) {

          element.style.setProperty(
            "--reveal-delay",
            `${Math.min(
              index * 70,
              700
            )}ms`
          );

        }

      }
    );


    const reveal =
      () => {

        requestAnimationFrame(
          () => {

            elements.forEach(
              element => {

                element.classList.add(
                  "is-visible"
                );

              }
            );

          }
        );

      };


    if (
      document.readyState ===
      "complete"
    ) {

      reveal();

    }
    else {

      window.addEventListener(
        "load",
        reveal,
        {
          once: true
        }
      );

    }

  }


  /* =======================================================
     INTERFACE ICONS
     ======================================================= */

  function initInterfaceIcons() {

    $$(".arrow").forEach(
      element => {

        if (
          element.querySelector(
            ".icon"
          )
        ) {
          return;
        }


        element.textContent = "";


        element.innerHTML = `
          <svg
            class="icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M5 12h13M13 6l6 6-6 6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        `;

      }
    );


    $$(".acc-head .plus").forEach(
      element => {

        if (
          element.querySelector(
            ".icon"
          )
        ) {
          return;
        }


        element.textContent = "";


        element.innerHTML = `
          <svg
            class="icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M12 5v14M5 12h14"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            ></path>
          </svg>
        `;

      }
    );

  }


  /* =======================================================
     CUSTOM CURSOR
     ======================================================= */

  function initCursor() {

    if (isTouchDevice) {
      return;
    }


    const dot =
      $(".cursor-dot");

    const outline =
      $(".cursor-outline");

    if (!dot || !outline) {
      return;
    }


    document.body.classList.add(
      "cursor-enabled"
    );


    let mouseX = -100;
    let mouseY = -100;

    let outlineX = -100;
    let outlineY = -100;


    document.addEventListener(
      "mousemove",
      event => {

        mouseX =
          event.clientX;

        mouseY =
          event.clientY;


        dot.style.transform =
          `translate(
            ${mouseX}px,
            ${mouseY}px
          ) translate(-50%, -50%)`;

      }
    );


    const animate =
      () => {

        outlineX +=
          (mouseX - outlineX) *
          0.16;

        outlineY +=
          (mouseY - outlineY) *
          0.16;


        outline.style.transform =
          `translate(
            ${outlineX}px,
            ${outlineY}px
          ) translate(-50%, -50%)`;


        requestAnimationFrame(
          animate
        );

      };


    requestAnimationFrame(
      animate
    );


    const interactive =
      "a, button, input, textarea, select, .skill-tab, .arch-node, .project-feature, .acc-item";


    document.addEventListener(
      "mouseover",
      event => {

        const target =
          event.target.closest(
            interactive
          );

        if (target) {

          outline.classList.add(
            "hover"
          );

        }

      }
    );


    document.addEventListener(
      "mouseout",
      event => {

        const target =
          event.target.closest(
            interactive
          );

        if (target) {

          outline.classList.remove(
            "hover"
          );

        }

      }
    );

  }


  /* =======================================================
     SKILLS
     ======================================================= */

  function initSkills() {

    const tabs =
      $$(".skill-tab");

    const panels =
      $$(".skill-panel");

    if (
      !tabs.length ||
      !panels.length
    ) {
      return;
    }


    tabs.forEach(
      tab => {

        tab.addEventListener(
          "click",
          () => {

            const target =
              tab.getAttribute(
                "aria-controls"
              );

            if (!target) {
              return;
            }


            tabs.forEach(
              item => {

                const active =
                  item === tab;

                item.classList.toggle(
                  "active",
                  active
                );

                item.setAttribute(
                  "aria-selected",
                  String(active)
                );

              }
            );


            panels.forEach(
              panel => {

                const active =
                  panel.id === target;

                panel.classList.toggle(
                  "active",
                  active
                );

                panel.setAttribute(
                  "aria-hidden",
                  String(!active)
                );

              }
            );

          }
        );

      }
    );

  }


  /* =======================================================
     ACCORDIONS
     ======================================================= */

  function initAccordions() {

    const items =
      $$(".acc-item");

    items.forEach(
      item => {

        const head =
          $(".acc-head", item);

        if (!head) {
          return;
        }


        head.setAttribute(
          "role",
          "button"
        );

        head.setAttribute(
          "tabindex",
          "0"
        );


        const toggle =
          () => {

            const open =
              item.classList.toggle(
                "open"
              );


            head.setAttribute(
              "aria-expanded",
              String(open)
            );

          };


        head.addEventListener(
          "click",
          toggle
        );


        head.addEventListener(
          "keydown",
          event => {

            if (
              event.key ===
              "Enter" ||
              event.key ===
              " "
            ) {

              event.preventDefault();

              toggle();

            }

          }
        );

      }
    );


    $$(".arch-node").forEach(
      node => {

        node.addEventListener(
          "click",
          () => {

            node.classList.toggle(
              "open"
            );

          }
        );

      }
    );

  }


  /* =======================================================
     ARCHITECTURE
     ======================================================= */

  function initArchitecture() {

    const nodes =
      $$(".arch-node");

    if (!nodes.length) {
      return;
    }


    nodes.forEach(
      node => {

        node.setAttribute(
          "tabindex",
          "0"
        );


        const toggle =
          () => {

            node.classList.toggle(
              "open"
            );

          };


        node.addEventListener(
          "click",
          toggle
        );


        node.addEventListener(
          "keydown",
          event => {

            if (
              event.key ===
              "Enter" ||
              event.key ===
              " "
            ) {

              event.preventDefault();

              toggle();

            }

          }
        );

      }
    );

  }


  /* =======================================================
     PROJECT MODAL
     ======================================================= */

  /* Extended details shown inside the project modal.
     Keyed by each card's data-project-id. */
  const PROJECT_DETAILS = {

    "mfc-youth": {
      title: "MFC Youth Area<br>Management System",
      meta: "Completed &middot; Software Development",
      description:
        "An offline desktop application designed to help Missionary " +
        "Families of Christ (MFC) Youth areas efficiently manage " +
        "members, chapters, and service assignments through a " +
        "centralized local database.",
      tags: [
        "C#", "Windows Forms", "SQLite", "Git", "GitHub", "Inno Setup"
      ],
      links: [
        {
          label: "GitHub ↗",
          href: "https://github.com/migzdndd/MFC-Youth-Area-Management-System",
          external: true
        }
      ]
    },

    "mytale-asia": {
      title: "MyTale Asia<br>Hytale Development",
      meta: "Completed &middot; Server Development",
      description:
        "Hytale server development project for MyTale Asia, involving " +
        "server-side development, mods, plugins, configuration, and " +
        "ongoing maintenance using Java, Git, and GitHub.",
      tags: ["Java", "Git", "GitHub", "OpenAI"],
      links: [
        {
          label: "GitHub ↗",
          href: "https://github.com/Xerain556/MyTale-Asia-Development",
          external: true
        }
      ]
    },

    "bitmon-smp": {
      title: "BitMon SMP<br>Cobblemon Survival Server",
      meta: "Ongoing &middot; Minecraft Server Development",
      description:
        "BitMon SMP is a Cobblemon-themed Minecraft Survival " +
        "Multiplayer server that blends the traditional Minecraft " +
        "survival experience with Pok\u00e9mon-inspired creature " +
        "collecting and training. As an Assistant Developer, I help " +
        "build and improve server features, configure and maintain " +
        "server systems, troubleshoot technical issues, and support " +
        "plugin and mod integration for the wider multiplayer " +
        "experience.",
      tags: [
        "Java", "Minecraft Server Development", "Cobblemon",
        "Server Configuration", "Mod/Plugin Integration",
        "Git", "GitHub", "Debugging &amp; Troubleshooting"
      ],
      links: []
    },

    "this-webpage": {
      title: "This Webpage<br>Portfolio Website",
      meta: "Completed &middot; Web Development",
      description:
        "The site you're on right now — a responsive, multi-page " +
        "portfolio built from scratch to bring my projects, skills, " +
        "and interests together in one place, complete with theming, " +
        "page transitions, and a few small interactive details along " +
        "the way.",
      tags: [
        "HTML5", "CSS3", "JavaScript", "Google Fonts",
        "Responsive Design", "LocalStorage"
      ],
      links: [
        { label: "View Website ↗", href: "index.html", external: false }
      ]
    }

  };


  function initProjectModal() {

    const modal =
      $(".modal-overlay");

    if (!modal) {
      return;
    }


    const closeButtons =
      $$(".modal-close", modal);

    const modalTitle =
      $("#projectModalTitle", modal);

    const modalBody =
      $("#projectModalBody", modal);


    const projectCards =
      $$(".project-feature[data-project-clickable='true']");


    let lastFocused = null;


    const renderProject =
      id => {

        const data =
          PROJECT_DETAILS[id];

        if (!data || !modalTitle || !modalBody) {
          return false;
        }


        modalTitle.innerHTML = data.title;


        const tagsHtml =
          data.tags
            .map(tag => `<span class="tag">${tag}</span>`)
            .join("");


        const linksHtml =
          data.links
            .map(link => {

              const cls =
                link.external
                  ? "btn btn-ghost magnetic"
                  : "btn btn-ghost magnetic";

              const attrs =
                link.external
                  ? ' target="_blank" rel="noopener noreferrer"'
                  : "";

              return (
                `<a class="${cls}" href="${link.href}"${attrs}>` +
                `${link.label}</a>`
              );

            })
            .join("");


        modalBody.innerHTML =
          `<p class="pf-status" style="margin-bottom:1.4rem;">` +
          `<span class="dot" aria-hidden="true"></span>${data.meta}</p>` +
          `<div class="modal-section"><h4>Overview</h4>` +
          `<p>${data.description}</p></div>` +
          `<div class="modal-section"><h4>Technologies</h4>` +
          `<div class="pf-tags">${tagsHtml}</div></div>` +
          (
            linksHtml
              ? `<div class="modal-section pf-actions">${linksHtml}</div>`
              : ""
          );


        return true;

      };


    const openModal =
      id => {

        if (!renderProject(id)) {
          return;
        }

        lastFocused =
          document.activeElement;

        modal.classList.add(
          "open"
        );

        modal.setAttribute(
          "aria-hidden",
          "false"
        );


        document.body.style
          .overflow = "hidden";


        const close =
          $(".modal-close", modal);

        if (close) {

          window.setTimeout(
            () => close.focus(),
            80
          );

        }

      };


    const closeModal =
      () => {

        modal.classList.remove(
          "open"
        );

        modal.setAttribute(
          "aria-hidden",
          "true"
        );


        document.body.style
          .overflow = "";


        if (lastFocused) {

          lastFocused.focus();

        }

      };


    projectCards.forEach(
      card => {

        const id =
          card.dataset.projectId;

        card.setAttribute(
          "tabindex",
          "0"
        );


        // Links/buttons inside the card (GitHub, View Website, etc.)
        // handle their own behaviour and shouldn't also trigger the
        // card's "open modal" click.
        $$("a, button", card).forEach(
          control => {

            control.addEventListener(
              "click",
              event => {

                event.stopPropagation();

                if (
                  control.dataset.projectOpen &&
                  control.tagName === "BUTTON"
                ) {

                  openModal(id);

                }

              }
            );

          }
        );


        card.addEventListener(
          "click",
          () => openModal(id)
        );


        card.addEventListener(
          "keydown",
          event => {

            if (
              event.key ===
              "Enter" ||
              event.key ===
              " "
            ) {

              event.preventDefault();

              openModal(id);

            }

          }
        );

      }
    );


    closeButtons.forEach(
      button => {

        button.addEventListener(
          "click",
          closeModal
        );

      }
    );


    modal.addEventListener(
      "click",
      event => {

        if (
          event.target ===
          modal
        ) {

          closeModal();

        }

      }
    );


    document.addEventListener(
      "keydown",
      event => {

        if (
          event.key ===
          "Escape" &&
          modal.classList.contains(
            "open"
          )
        ) {

          closeModal();

        }

      }
    );

  }


  /* =======================================================
     CONTACT INTERACTIONS
     ======================================================= */

  function initContactInteractions() {

    $$(".contact-row").forEach(
      row => {

        row.addEventListener(
          "mouseenter",
          () => {

            row.classList.add(
              "is-hovered"
            );

          }
        );


        row.addEventListener(
          "mouseleave",
          () => {

            row.classList.remove(
              "is-hovered"
            );

          }
        );

      }
    );

  }

  function initLoader() {

    const loader =
      $("#loader");

    if (!loader) {
      return;
    }

    /*
     * The loader is only shown on the
     * initial Home entry.
     *
     * Navigation back to Home should use
     * the normal page transition instead.
     */

    const navigationEntry =
      performance.getEntriesByType("navigation")[0];

    const isInitialHomeEntry =
      (
        window.location.pathname.endsWith("/") ||
        window.location.pathname.endsWith("/index.html") ||
        window.location.pathname === ""
      ) &&
      (
        !navigationEntry ||
        navigationEntry.type === "navigate"
      );

    if (!isInitialHomeEntry) {

      loader.classList.add("hide");

      loader.setAttribute(
        "aria-hidden",
        "true"
      );

      loader.setAttribute(
        "aria-busy",
        "false"
      );

      window.setTimeout(
        () => {

          if (
            loader &&
            loader.parentNode
          ) {

            loader.parentNode.removeChild(
              loader
            );

          }

        },
        50
      );

      return;

    }

    /*
     * Initial Home entry: play the short boot
     * sequence, then dismiss the loader.
     */

    const bar =
      $(".loader-bar-fill", loader);

    const status =
      $("#loaderStatus");

    const bootLines =
      $$(".loader-boot-line", loader);

    const lastBootLine =
      bootLines[bootLines.length - 1];

    const fillDuration =
      prefersReducedMotion ? 1 : 900;

    const holdDuration =
      prefersReducedMotion ? 120 : 420;

    // Boot lines fade in via CSS (staggered by --i).
    // Wait for them, then fill the progress bar.
    const bootDelay =
      prefersReducedMotion
        ? 0
        : (bootLines.length - 1) * 190 + 120 + 320;

    window.setTimeout(
      () => {

        if (bar) {

          bar.style.transition =
            `width ${fillDuration}ms var(--ease, ease)`;

          // Force layout so the transition reliably fires.
          void bar.offsetWidth;

          bar.style.width = "100%";

        }

      },
      bootDelay
    );

    const dismissAfter =
      bootDelay + fillDuration + holdDuration;

    window.setTimeout(
      () => {

        if (status) {

          status.textContent =
            "Profile Ready - Miguel Riovaldez";

        }

        loader.classList.add("hide");

        loader.setAttribute(
          "aria-hidden",
          "true"
        );

        loader.setAttribute(
          "aria-busy",
          "false"
        );

        window.setTimeout(
          () => {

            if (
              loader &&
              loader.parentNode
            ) {

              loader.parentNode.removeChild(
                loader
              );

            }

          },
          prefersReducedMotion ? 50 : 700
        );

      },
      dismissAfter
    );

  }

})();