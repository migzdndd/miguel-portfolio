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
                "data-target"
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

  function initProjectModal() {

    const modal =
      $(".modal-overlay");

    if (!modal) {
      return;
    }


    const closeButtons =
      $$(".modal-close", modal);


    const projectCards =
      $$(".project-feature[data-project-clickable='true']");


    const openModal =
      () => {

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


        if (
          projectCards[0]
        ) {

          projectCards[0].focus();

        }

      };


    projectCards.forEach(
      card => {

        card.setAttribute(
          "tabindex",
          "0"
        );


        card.addEventListener(
          "click",
          openModal
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

              openModal();

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


  /* =======================================================
     LOADER
     ======================================================= */

  function initLoader() {

    const loader =
      $("#loader");

    if (!loader) {
      return;
    }


    const core =
      $(".loader-core", loader);

    const bootLines =
      $$(".loader-boot-line", loader);

    const progress =
      $(".loader-bar-fill", loader);

    const progressValue =
      $(".loader-progress-meta .value", loader);

    const status =
      $(".loader-status", loader);


    const reducedMotion =
      prefersReducedMotion;


    let progressFrame =
      null;

    let loaderFinished =
      false;


    loader.setAttribute(
      "role",
      "status"
    );

    loader.setAttribute(
      "aria-live",
      "polite"
    );

    loader.setAttribute(
      "aria-busy",
      "true"
    );


    if (core) {

      core.style.willChange =
        "transform, opacity";


      bootLines.forEach(
        (line, index) => {

          line.style.setProperty(
            "--i",
            index
          );

        }
      );

    }


    const minimumTime =
      reducedMotion

        ? 180

        : Math.min(
            2200,
            Math.max(
              1150,
              760 +
              (
                bootLines.length *
                130
              )
            )
          );


    const startedAt =
      performance.now();


    const updateProgress =
      value => {

        const clamped =
          Math.max(
            0,
            Math.min(
              100,
              value
            )
          );


        if (progress) {

          progress.style.width =
            `${clamped}%`;

        }


        if (progressValue) {

          progressValue.textContent =
            `${Math.round(
              clamped
            )}%`;

        }

      };


    const updateStatus =
      text => {

        if (!status) {
          return;
        }


        const value =
          $(".loader-status-text", status);


        if (value) {

          value.textContent =
            text;

        }
        else {

          status.textContent =
            text;

        }

      };


    const finishLoader =
      () => {

        if (loaderFinished) {
          return;
        }


        loaderFinished = true;


        if (progressFrame) {

          window.cancelAnimationFrame(
            progressFrame
          );

          progressFrame = null;

        }


        updateProgress(
          100
        );


        updateStatus(
          "Portfolio ready"
        );


        bootLines.forEach(
          (line, index) => {

            if (
              index ===
              bootLines.length - 1
            ) {

              line.classList.add(
                "loader-boot-ready"
              );

            }

          }
        );


        const elapsed =
          performance.now() -
          startedAt;


        const remaining =
          Math.max(
            0,
            minimumTime -
            elapsed
          );


        window.setTimeout(
          () => {

            loader.classList.add(
              "hide"
            );


            loader.setAttribute(
              "aria-hidden",
              "true"
            );


            loader.setAttribute(
              "aria-busy",
              "false"
            );


            window.dispatchEvent(
              new CustomEvent(
                "portfolio:loader-hidden"
              )
            );


            window.setTimeout(
              () => {

                if (
                  progressFrame
                ) {

                  window.cancelAnimationFrame(
                    progressFrame
                  );

                  progressFrame =
                    null;

                }


                if (
                  loader &&
                  loader.parentNode
                ) {

                  loader.parentNode.removeChild(
                    loader
                  );

                }

              },
              reducedMotion
                ? 30
                : 720
            );

          },
          remaining
        );

      };


    const animateProgress =
      () => {

        if (loaderFinished) {
          return;
        }


        const elapsed =
          performance.now() -
          startedAt;


        const ratio =
          Math.min(
            1,
            elapsed /
            minimumTime
          );


        const eased =
          1 -
          Math.pow(
            1 - ratio,
            2.4
          );


        updateProgress(
          eased * 100
        );


        if (
          ratio >= 1
        ) {

          progressFrame =
            null;

          finishLoader();

          return;

        }


        progressFrame =
          requestAnimationFrame(
            animateProgress
          );

      };


    updateProgress(
      0
    );


    updateStatus(
      "Initializing interface"
    );


    if (reducedMotion) {

      updateProgress(
        100
      );

      updateStatus(
        "Portfolio ready"
      );

      finishLoader();

      return;

    }


    progressFrame =
      requestAnimationFrame(
        animateProgress
      );


    window.addEventListener(
      "load",
      () => {

        const elapsed =
          performance.now() -
          startedAt;


        if (
          elapsed >=
          minimumTime
        ) {

          finishLoader();

        }

      },
      {
        once: true
      }
    );


    /*
     * Hard safety fallback.
     * The portfolio must never remain
     * inaccessible because of the loader.
     */

    window.setTimeout(
      finishLoader,
      2600
    );

  }


})();