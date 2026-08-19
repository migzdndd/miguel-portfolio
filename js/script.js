/* =========================================================
   MIGUEL RIOVALDEZ PORTFOLIO
   SHARED MULTI-PAGE JAVASCRIPT
   ========================================================= */

(function () {

  "use strict";


  /* =======================================================
     GLOBAL STATE
     ======================================================= */

  var reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  var isTouch =
    window.matchMedia(
      "(pointer: coarse)"
    ).matches;


  var isNavigating = false;


  if (isTouch) {

    document.body.classList.add(
      "touch"
    );

  }


  /* =======================================================
     DOM READY
     ======================================================= */

  document.addEventListener(
    "DOMContentLoaded",
    function () {

      initLoader();

      initTheme();

      initCurrentPage();

      initMobileNavigation();

      initCustomCursor();

      initMagneticElements();

      initHeroNodes();

      initProjectModal();

      initArchitectureNodes();

      initSkills();

      initNetworking();

      initAccomplishments();

      /*
       * Multi-page transition system.
       */
      initPageTransition();

      /*
       * Sequential content reveal.
       */
      initSequentialReveal();

    }
  );


  /* =======================================================
     LOADER
     ======================================================= */

  function initLoader() {

    var loader =
      document.getElementById(
        "loader"
      );


    if (!loader) {

      return;

    }


    window.setTimeout(
      function () {

        loader.classList.add(
          "hide"
        );


        /*
         * Tell the Home page that the loader
         * has finished so its content can begin
         * revealing.
         */

        document.dispatchEvent(
          new Event(
            "portfolio:loader-hidden"
          )
        );

      },
      1000
    );

  }


  /* =======================================================
     THEME
     ======================================================= */

  function initTheme() {

    var html =
      document.documentElement;


    var toggle =
      document.getElementById(
        "themeToggle"
      );


    if (!toggle) {

      return;

    }


    var savedTheme = null;


    try {

      savedTheme =
        localStorage.getItem(
          "portfolio-theme"
        );

    } catch (error) {

      savedTheme = null;

    }


    if (
      savedTheme === "light" ||
      savedTheme === "dark"
    ) {

      html.setAttribute(
        "data-theme",
        savedTheme
      );

    }


    updateThemeButton();


    toggle.addEventListener(
      "click",
      function () {

        var current =
          html.getAttribute(
            "data-theme"
          ) || "dark";


        var next =
          current === "dark"
            ? "light"
            : "dark";


        html.setAttribute(
          "data-theme",
          next
        );


        try {

          localStorage.setItem(
            "portfolio-theme",
            next
          );

        } catch (error) {

          /*
           * Theme still works for
           * the current page.
           */

        }


        updateThemeButton();

      }
    );


    function updateThemeButton() {

      var current =
        html.getAttribute(
          "data-theme"
        ) || "dark";


      toggle.textContent =
        current === "dark"
          ? "◐"
          : "☀";


      toggle.setAttribute(
        "aria-label",
        current === "dark"
          ? "Switch to light theme"
          : "Switch to dark theme"
      );


      toggle.setAttribute(
        "title",
        current === "dark"
          ? "Switch to light theme"
          : "Switch to dark theme"
      );

    }

  }


  /* =======================================================
     CURRENT PAGE
     ======================================================= */

  function initCurrentPage() {

    var links =
      document.querySelectorAll(
        "[data-page-link]"
      );


    if (!links.length) {

      return;

    }


    var filename =
      window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();


    var currentPage =
      "home";


    if (
      filename &&
      filename !== "index.html"
    ) {

      currentPage =
        filename.replace(
          ".html",
          ""
        );

    }


    links.forEach(
      function (link) {

        var page =
          link.getAttribute(
            "data-page-link"
          );


        var isCurrent =
          page === currentPage;


        link.classList.toggle(
          "page-link-current",
          isCurrent
        );


        if (isCurrent) {

          link.setAttribute(
            "aria-current",
            "page"
          );

        } else {

          link.removeAttribute(
            "aria-current"
          );

        }

      }
    );

  }


  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  function initMobileNavigation() {

    var toggle =
      document.getElementById(
        "mobileToggle"
      );


    var panel =
      document.getElementById(
        "controlPanel"
      );


    if (!toggle || !panel) {

      return;

    }


    var links =
      panel.querySelectorAll(
        "a"
      );


    function closeMenu() {

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


      toggle.setAttribute(
        "aria-label",
        "Open navigation"
      );

    }


    toggle.addEventListener(
      "click",
      function () {

        var isOpen =
          panel.classList.toggle(
            "open"
          );


        toggle.classList.toggle(
          "open",
          isOpen
        );


        toggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );


        toggle.setAttribute(
          "aria-label",
          isOpen
            ? "Close navigation"
            : "Open navigation"
        );

      }
    );


    links.forEach(
      function (link) {

        link.addEventListener(
          "click",
          function () {

            closeMenu();

          }
        );

      }
    );


    document.addEventListener(
      "click",
      function (event) {

        if (
          !panel.classList.contains(
            "open"
          )
        ) {

          return;

        }


        if (
          panel.contains(
            event.target
          ) ||
          toggle.contains(
            event.target
          )
        ) {

          return;

        }


        closeMenu();

      }
    );


    document.addEventListener(
      "keydown",
      function (event) {

        if (
          event.key === "Escape"
        ) {

          closeMenu();

        }

      }
    );

  }


  /* =======================================================
     CUSTOM CURSOR
     ======================================================= */

  function initCustomCursor() {

    if (isTouch) {

      return;

    }


    var dot =
      document.getElementById(
        "cursorDot"
      );


    var outline =
      document.getElementById(
        "cursorOutline"
      );


    var cursorText =
      document.getElementById(
        "cursorText"
      );


    if (
      !dot ||
      !outline
    ) {

      return;

    }


    var mouseX =
      window.innerWidth / 2;


    var mouseY =
      window.innerHeight / 2;


    var outlineX =
      mouseX;


    var outlineY =
      mouseY;


    document.addEventListener(
      "mousemove",
      function (event) {

        mouseX =
          event.clientX;

        mouseY =
          event.clientY;


        dot.style.transform =
          "translate(" +
          mouseX +
          "px," +
          mouseY +
          "px) translate(-50%,-50%)";

      }
    );


    function animate() {

      outlineX +=
        (mouseX - outlineX) *
        0.18;


      outlineY +=
        (mouseY - outlineY) *
        0.18;


      outline.style.transform =
        "translate(" +
        outlineX +
        "px," +
        outlineY +
        "px) translate(-50%,-50%)";


      requestAnimationFrame(
        animate
      );

    }


    animate();


    document.addEventListener(
      "mouseover",
      function (event) {

        var element =
          event.target.closest(
            "a,button,[role='button'],.magnetic,.arch-node,.net-svg-node,.acc-head"
          );


        if (!element) {

          return;

        }


        outline.classList.add(
          "hover"
        );


        if (cursorText) {

          cursorText.textContent =
            element.getAttribute(
              "data-cursor-text"
            ) || "";

        }

      }
    );


    document.addEventListener(
      "mouseout",
      function (event) {

        var element =
          event.target.closest(
            "a,button,[role='button'],.magnetic,.arch-node,.net-svg-node,.acc-head"
          );


        if (!element) {

          return;

        }


        if (
          element.contains(
            event.relatedTarget
          )
        ) {

          return;

        }


        outline.classList.remove(
          "hover"
        );


        if (cursorText) {

          cursorText.textContent =
            "";

        }

      }
    );

  }


  /* =======================================================
     MAGNETIC ELEMENTS
     ======================================================= */

  function initMagneticElements() {

    if (
      isTouch ||
      reducedMotion
    ) {

      return;

    }


    var elements =
      document.querySelectorAll(
        ".magnetic"
      );


    elements.forEach(
      function (element) {

        element.addEventListener(
          "mousemove",
          function (event) {

            var rect =
              element.getBoundingClientRect();


            var x =
              event.clientX -
              rect.left -
              rect.width / 2;


            var y =
              event.clientY -
              rect.top -
              rect.height / 2;


            element.style.transform =
              "translate(" +
              (x * 0.18) +
              "px," +
              (y * 0.18) +
              "px)";

          }
        );


        element.addEventListener(
          "mouseleave",
          function () {

            element.style.transform =
              "";

          }
        );

      }
    );

  }


  /* =======================================================
     HERO BACKGROUND NODES
     ======================================================= */

  function initHeroNodes() {

    var container =
      document.getElementById(
        "heroNodes"
      );


    if (!container) {

      return;

    }


    var count =
      window.innerWidth < 820
        ? 8
        : 16;


    var nodes = [];


    for (
      var i = 0;
      i < count;
      i++
    ) {

      var node =
        document.createElement(
          "div"
        );


      node.className =
        "hero-node";


      var top =
        Math.random() * 100;


      var left =
        Math.random() * 100;


      node.style.top =
        top + "%";


      node.style.left =
        left + "%";


      container.appendChild(
        node
      );


      nodes.push({

        element: node,

        depth:
          0.4 +
          Math.random() *
          0.6

      });

    }


    if (
      isTouch ||
      reducedMotion
    ) {

      return;

    }


    window.addEventListener(
      "mousemove",
      function (event) {

        var px =
          event.clientX /
          window.innerWidth -
          0.5;


        var py =
          event.clientY /
          window.innerHeight -
          0.5;


        nodes.forEach(
          function (node) {

            node.element.style.transform =
              "translate(" +
              (
                px *
                20 *
                node.depth
              ) +
              "px," +
              (
                py *
                20 *
                node.depth
              ) +
              "px)";

          }
        );

      }
    );

  }


  /* =======================================================
     PROJECT MODAL
     ======================================================= */

  function initProjectModal() {

    var modal = document.getElementById("projectModal");
    var closeButton = document.getElementById("modalClose");
    var title = document.getElementById("projectModalTitle");
    var body = document.getElementById("projectModalBody");

    if (!modal || !closeButton || !title || !body) return;

    /*
     * Project content lives in one reusable structure.
     * Add another object here when a new project is introduced.
     */
    var projects = {
      "mfc-youth": {
        title: "MFC Youth Area Management System",
        sections: [
          { heading: "Overview", text: "An offline desktop application built with C# and Windows Forms to help Missionary Families of Christ (MFC) Youth areas manage members, chapters, and service assignments through a centralized local SQLite database." },
          { heading: "Problem", text: "MFC Youth areas track members, chapter groupings, and service assignments — information that's hard to manage reliably without a dedicated, offline-friendly tool." },
          { heading: "Solution", text: "A self-contained Windows desktop app with a local SQLite database, so area coordinators can manage members, chapters, and assignments in one place without needing an internet connection." },
          { heading: "Features", list: ["Members management", "Chapters management", "Services management & assignments", "Dashboard & statistics", "Search & refresh", "Member relationships", "Local SQLite database", "Packaged Windows installer"] },
          { heading: "Technologies", tags: ["C#", "Windows Forms", "SQLite", "Git", "GitHub", "Inno Setup"] },
          { heading: "What I Learned", list: ["Structuring a multi-form Windows desktop application in C#", "Designing and querying a local relational database with SQLite", "Packaging and distributing a desktop app with Inno Setup", "Managing a real project's history with Git and GitHub"] },
          {
            heading: "Architecture", architecture: [
              ["User Interface", "Windows Forms screens for members, chapters, services, and the dashboard."],
              ["Application Logic", "C# handles data flow, validation, and assignment relationships between screens."],
              ["Database", "Local SQLite database stores members, chapters, and service records."]
            ]
          }
        ],
        link: "https://github.com/migzdndd/MFC-Youth-Area-Management-System"
      },
      "mytale-asia": {
        title: "MyTale Asia Hytale Development",
        sections: [
          { heading: "Overview", text: "Hytale server development project for MyTale Asia, involving server-side development, mods, plugins, configuration, and ongoing maintenance using Java, Git, and GitHub." },
          { heading: "Project Type", text: "Server Development" },
          { heading: "Technologies", tags: ["Java", "Git", "GitHub", "OpenAI"] }
        ],
        link: "https://github.com/Xerain556/MyTale-Asia-Development"
      },
      "this-webpage": {
        title: "This Webpage — Portfolio Website",
        sections: [
          {
            heading: "Overview",
            text: "The portfolio website itself, built as a responsive multi-page website to showcase projects, skills, accomplishments, interests, and contact information."
          },
          {
            heading: "Features",
            list: [
              "Multi-page navigation",
              "Responsive design for desktop and mobile",
              "Dark and light theme toggle",
              "Custom cursor and magnetic interactions",
              "Page transition and sequential reveal animations",
              "Interactive project modal",
              "Skills category tabs",
              "Networking visualization",
              "Accomplishments accordion",
              "Local theme preference storage"
            ]
          },
          {
            heading: "Technologies",
            tags: [
              "HTML5",
              "CSS3",
              "JavaScript",
              "Google Fonts",
              "Responsive Design",
              "LocalStorage"
            ]
          },
          {
            heading: "JavaScript Uses",
            list: [
              "Theme switching with localStorage",
              "Mobile navigation",
              "Custom cursor interactions",
              "Magnetic buttons and links",
              "Page transitions",
              "Sequential content reveals",
              "Project details modal",
              "Skills and networking interactions",
              "Accomplishments accordion"
            ]
          }
        ],
        link: "index.html",
        linkLabel: "View Website ↗"
      }
    };

    var lastFocused = null;

    function escapeHTML(value) {
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    function renderProject(project) {
      title.textContent = project.title;
      body.innerHTML = "";

      project.sections.forEach(function (section) {
        var wrapper = document.createElement("div");
        wrapper.className = "modal-section";

        var heading = document.createElement("h4");
        heading.textContent = section.heading;
        wrapper.appendChild(heading);

        if (section.text) {
          var p = document.createElement("p");
          p.textContent = section.text;
          wrapper.appendChild(p);
        }

        if (section.list) {
          var ul = document.createElement("ul");
          section.list.forEach(function (item) {
            var li = document.createElement("li");
            li.textContent = item;
            ul.appendChild(li);
          });
          wrapper.appendChild(ul);
        }

        if (section.tags) {
          var tags = document.createElement("div");
          tags.className = "pf-tags";
          section.tags.forEach(function (tagText) {
            var tag = document.createElement("span");
            tag.className = "tag";
            tag.textContent = tagText;
            tags.appendChild(tag);
          });
          wrapper.appendChild(tags);
        }

        if (section.architecture) {
          var arch = document.createElement("div");
          arch.className = "arch-diagram";
          section.architecture.forEach(function (nodeData, index) {
            var node = document.createElement("div");
            node.className = "arch-node";
            node.setAttribute("tabindex", "0");
            node.innerHTML = '<div class="lbl">' + escapeHTML(nodeData[0]) + '</div><div class="expl">' + escapeHTML(nodeData[1]) + '</div>';
            arch.appendChild(node);
            if (index < section.architecture.length - 1) {
              var arrow = document.createElement("div");
              arrow.className = "arch-arrow";
              arrow.textContent = "↓";
              arch.appendChild(arrow);
            }
          });
          wrapper.appendChild(arch);
        }

        body.appendChild(wrapper);
      });

      var actions = document.createElement("div");
      actions.className = "modal-section project-modal-actions";
      var link = document.createElement("a");
      link.className = "btn btn-primary";
      link.href = project.link;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = project.linkLabel || "View on GitHub ↗";
      actions.appendChild(link);
      body.appendChild(actions);
    }

    function openModal(projectId) {
      var project = projects[projectId];
      if (!project) return;

      lastFocused = document.activeElement;
      renderProject(project);
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      window.setTimeout(function () { closeButton.focus(); }, 30);
    }

    function closeModal() {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }

    document.querySelectorAll("[data-project-open]:not(.project-feature)").forEach(function (trigger) {
      trigger.addEventListener("click", function (event) {
        if (trigger.matches("a")) return;
        event.preventDefault();
        event.stopPropagation();
        openModal(trigger.getAttribute("data-project-open"));
      });
    });

    document.querySelectorAll(".project-feature[data-project-open=\"true\"]").forEach(function (card) {
      card.addEventListener("click", function (event) {
        if (event.target.closest("a") || event.target.closest("button")) return;
        openModal(card.getAttribute("data-project-id"));
      });
      card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openModal(card.getAttribute("data-project-id"));
        }
      });
    });

    closeButton.addEventListener("click", closeModal);
    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeModal();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
    });
  }


  /* =======================================================
     ARCHITECTURE NODES
     ======================================================= */

  function initArchitectureNodes() {

    var nodes =
      document.querySelectorAll(
        ".arch-node"
      );


    if (!nodes.length) {

      return;

    }


    nodes.forEach(
      function (node) {

        function toggle() {

          var wasOpen =
            node.classList.contains(
              "open"
            );


          nodes.forEach(
            function (other) {

              other.classList.remove(
                "open"
              );

            }
          );


          if (!wasOpen) {

            node.classList.add(
              "open"
            );

          }

        }


        node.addEventListener(
          "click",
          toggle
        );


        node.addEventListener(
          "keydown",
          function (event) {

            if (
              event.key === "Enter" ||
              event.key === " "
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
     SKILLS
     ======================================================= */

  function initSkills() {

    var tabs = document.querySelectorAll(".skill-tab");
    var panelsContainer = document.getElementById("skillsPanels");

    if (!tabs.length || !panelsContainer) return;

    /*
     * Content-driven skill data.
     * Add a new skill to the appropriate category instead of creating
     * another custom HTML structure.
     */
    var skillsData = {
      development: [
        { name: "C#", lvl: "Learning" },
        { name: "C++", lvl: "Intermediate" },
        { name: "Python", lvl: "Learning" },
        { name: "Java", lvl: "Learning" },
        { name: "JavaScript", lvl: "Learning" }
      ],
      networking: [
        { name: "IPv4", lvl: "Learning" },
        { name: "IPv6", lvl: "Learning" },
        { name: "Subnetting", lvl: "Learning" },
        { name: "Data Comm. & Networking Fundamentals", lvl: "Learning" },
        { name: "Cisco Packet Tracer", lvl: "Learning" }
      ],
      database: [
        { name: "SQLite", lvl: "Learning" },
        { name: "SQL", lvl: "Learning" },
        { name: "MySQL / DB Management", lvl: "Learning" }
      ],
      web: [
        { name: "HTML", lvl: "Learning" },
        { name: "CSS", lvl: "Learning" },
        { name: "JavaScript", lvl: "Learning" },
        { name: "Responsive Web Design", lvl: "Learning" }
      ],
      creative: [
        { name: "Canva", lvl: "Learning" },
        { name: "UI/UX", lvl: "Learning" },
        { name: "Graphic Design", lvl: "Learning" },
        { name: "Digital Design", lvl: "Learning" },
        { name: "Content Creation", lvl: "Learning" }
      ]
    };

    function escapeHTML(value) {
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    function renderSkills(activeCategory) {
      panelsContainer.innerHTML = "";

      Object.keys(skillsData).forEach(function (category) {
        var panel = document.createElement("div");
        panel.className = "skill-panel";
        panel.id = "panel-" + category;
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-labelledby", "skill-" + category);

        if (category === activeCategory) panel.classList.add("active");

        skillsData[category].forEach(function (skill) {
          var card = document.createElement("div");
          card.className = "skill-card";
          card.innerHTML =
            '<div class="name">' + escapeHTML(skill.name) + '</div>' +
            '<div class="lvl" aria-label="Proficiency: ' + escapeHTML(skill.lvl) + '">' +
            escapeHTML(skill.lvl) + '</div>';
          panel.appendChild(card);
        });

        panelsContainer.appendChild(panel);
      });
    }

    tabs.forEach(function (tab) {
      tab.id = "skill-" + tab.getAttribute("data-skill");
    });

    renderSkills("development");

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var category = tab.getAttribute("data-skill");

        tabs.forEach(function (other) {
          var active = other === tab;
          other.classList.toggle("active", active);
          other.setAttribute("aria-selected", String(active));
        });

        renderSkills(category);
      });

      tab.addEventListener("keydown", function (event) {
        var index = Array.prototype.indexOf.call(tabs, tab);
        var next = index;

        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;

        if (next !== index) {
          event.preventDefault();
          tabs[next].focus();
          tabs[next].click();
        }
      });
    });
  }


  /* =======================================================
     NETWORKING
     ======================================================= */

  function initNetworking() {

    var nodes =
      document.querySelectorAll(
        ".net-svg-node"
      );


    var explanation =
      document.getElementById(
        "netExplain"
      );


    if (!nodes.length) {

      return;

    }


    var networkInfo = {

      internet:
        "Internet — the wide-area network everything eventually connects out to.",

      router:
        "Router — directs traffic between the local network and the internet.",

      switch:
        "Switch — connects devices within the local network together.",

      server:
        "Server — a machine on the network offering shared resources or services.",

      pc1:
        "PC — an end-user device connected to the local network.",

      pc2:
        "PC — an end-user device connected to the local network."

    };


    nodes.forEach(
      function (node) {

        function activate() {

          nodes.forEach(
            function (other) {

              other.classList.remove(
                "active"
              );

            }
          );


          node.classList.add(
            "active"
          );


          if (explanation) {

            explanation.textContent =
              networkInfo[
              node.getAttribute(
                "data-node"
              )
              ] ||
              "Networking concept.";

          }

        }


        node.addEventListener(
          "click",
          activate
        );


        node.addEventListener(
          "mouseenter",
          activate
        );


        node.addEventListener(
          "keydown",
          function (event) {

            if (
              event.key === "Enter" ||
              event.key === " "
            ) {

              event.preventDefault();

              activate();

            }

          }
        );

      }
    );

  }


  /* =======================================================
     ACCOMPLISHMENTS
     ======================================================= */

  function initAccomplishments() {

    var items =
      document.querySelectorAll(
        ".acc-item"
      );


    if (!items.length) {

      return;

    }


    items.forEach(
      function (item) {

        var header =
          item.querySelector(
            ".acc-head"
          );


        if (!header) {

          return;

        }


        header.setAttribute(
          "tabindex",
          "0"
        );


        header.setAttribute(
          "role",
          "button"
        );


        function toggle() {

          var wasOpen =
            item.classList.contains(
              "open"
            );


          items.forEach(
            function (other) {

              other.classList.remove(
                "open"
              );

            }
          );


          if (!wasOpen) {

            item.classList.add(
              "open"
            );

          }

        }


        header.addEventListener(
          "click",
          toggle
        );


        header.addEventListener(
          "keydown",
          function (event) {

            if (
              event.key === "Enter" ||
              event.key === " "
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
     SEQUENTIAL CONTENT REVEAL
     ======================================================= */
  function initSequentialReveal() {

    var page =
      document.querySelector(
        ".page-shell, .standalone-page"
      );


    if (!page) {

      return;

    }


    /*
     * Elements are intentionally targeted individually
     * so the page feels like it is being constructed
     * piece by piece rather than appearing all at once.
     */

    var selectors = [

      /* ==============================
         HOME
         ============================== */

      ".hero-content .eyebrow",

      ".hero-name",

      ".hero-sub",

      ".hero-support",

      ".hero-tagline",

      ".hero-bio",

      ".hero-ctas",

      ".status-strip",


      /* ==============================
         PAGE HEADERS
         ============================== */

      ".page-head .eyebrow",

      ".page-head h1",


      /* ==============================
         ABOUT
         ============================== */

      ".about-copy p",

      ".learning-list .tag",

      ".fact-row",


      /* ==============================
         PROJECTS
         ============================== */

      ".project-feature .pf-top",

      ".project-feature .pf-title",

      ".project-feature .pf-desc",

      ".project-feature .pf-tags .tag",

      ".project-feature .pf-actions .btn",

      ".projects-note",


      /* ==============================
         SKILLS
         ============================== */

      ".skills-tabs .skill-tab",

      ".skill-panel.active .skill-card",


      /* ==============================
         NETWORKING
         ============================== */

      ".net-viz",

      ".net-layout > div:last-child > p",

      ".net-topic",


      /* ==============================
         ACCOMPLISHMENTS
         ============================== */

      ".acc-item",


      /* ==============================
         BEYOND
         ============================== */

      ".beyond-card",


      /* ==============================
         CONTACT
         ============================== */

      ".contact-list .contact-row"

    ];


    var revealTargets = [];


    /*
     * Collect elements in document order.
     */

    selectors.forEach(
      function (selector) {

        var elements =
          page.querySelectorAll(
            selector
          );


        elements.forEach(
          function (element) {

            if (
              revealTargets.indexOf(
                element
              ) === -1
            ) {

              revealTargets.push(
                element
              );

            }

          }
        );

      }
    );


    if (!revealTargets.length) {

      return;

    }


    /*
     * Sort according to the actual position
     * of each element in the document.
     */

    revealTargets.sort(
      function (a, b) {

        if (
          a === b
        ) {

          return 0;

        }


        var position =
          a.compareDocumentPosition(
            b
          );


        if (
          position &
          Node.DOCUMENT_POSITION_FOLLOWING
        ) {

          return -1;

        }


        return 1;

      }
    );


    /*
     * Apply the initial hidden state and
     * calculate the stagger delay.
     */

    revealTargets.forEach(
      function (
        element,
        index
      ) {

        element.classList.add(
          "page-reveal"
        );


        element.style.setProperty(
          "--reveal-delay",
          (
            60 +
            index * 55
          ) +
          "ms"
        );

      }
    );


    function reveal() {

      window.requestAnimationFrame(
        function () {

          window.requestAnimationFrame(
            function () {

              revealTargets.forEach(
                function (
                  element
                ) {

                  element.classList.add(
                    "is-visible"
                  );

                }
              );

            }
          );

        }
      );

    }


    /*
     * Home waits for the initialization loader.
     */

    var isHome =
      page.classList.contains(
        "page-shell"
      );


    var loader =
      document.getElementById(
        "loader"
      );


    if (
      isHome &&
      loader
    ) {

      if (
        loader.classList.contains(
          "hide"
        )
      ) {

        reveal();

      } else {

        document.addEventListener(
          "portfolio:loader-hidden",
          reveal,
          {
            once: true
          }
        );

      }

    } else {

      /*
       * All other pages begin their reveal
       * immediately.
       */

      reveal();

    }

  }
  /* =======================================================
   PAGE TRANSITIONS
   ======================================================= */

  function initPageTransition() {

    var transition =
      document.getElementById(
        "pageTransition"
      );

    if (!transition) {

      return;

    }


    /*
     * Every page starts underneath the same green/black
     * system layer, then the layer sweeps away.
     * This keeps normal page loads and browser Back/Forward
     * navigation visually consistent.
     */

    if (!reducedMotion) {

      document.body.classList.add(
        "page-entering"
      );

      window.setTimeout(
        function () {

          document.body.classList.remove(
            "page-entering"
          );

        },
        760
      );

    }


    /*
     * Handle internal portfolio navigation.
     */

    var links =
      document.querySelectorAll(
        "a[href]"
      );


    links.forEach(
      function (link) {

        link.addEventListener(
          "click",
          function (event) {

            var href =
              link.getAttribute(
                "href"
              );


            if (
              !href ||
              href === "#"
            ) {

              return;

            }


            /*
             * External links, downloads, and
             * modified clicks keep normal behavior.
             */

            if (
              link.target === "_blank" ||
              link.hasAttribute(
                "download"
              )
            ) {

              return;

            }


            if (
              event.ctrlKey ||
              event.metaKey ||
              event.shiftKey ||
              event.altKey
            ) {

              return;

            }


            var destination;


            try {

              destination =
                new URL(
                  href,
                  window.location.href
                );

            } catch (error) {

              return;

            }


            if (
              destination.origin !==
              window.location.origin
            ) {

              return;

            }


            /*
             * Ignore same-page navigation.
             */

            if (
              destination.pathname ===
              window.location.pathname &&
              destination.search ===
              window.location.search &&
              destination.hash ===
              window.location.hash
            ) {

              return;

            }


            if (isNavigating) {
              event.preventDefault();
              return;
            }


            event.preventDefault();


            if (reducedMotion) {
              isNavigating = true;

              window.location.href =
                destination.href;

              return;

            }


            /*
             * Sweep the green/black system layer back
             * over the current page before navigation.
             */

            isNavigating = true;

            document.body.classList.remove(
              "page-entering"
            );

            document.body.classList.add(
              "page-leaving"
            );


            window.setTimeout(
              function () {

                window.location.href =
                  destination.href;

              },
              540
            );

          }
        );

      }
    );

  }


})();
