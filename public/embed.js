/* global document, window, URL, fetch */
(function () {
  var STYLE_ID = "learnnify-widget-style";

  function getServiceOrigin() {
    var script = document.currentScript;

    if (script && script.src) {
      return new URL(script.src).origin;
    }

    return window.location.origin;
  }

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = [
      ".learnnify-widget{font-family:'Space Grotesk',system-ui,sans-serif;color:#1c1f24;background:#f1f2f4;border:1px solid rgba(28,31,36,.06);border-radius:8px;box-shadow:rgba(255,255,255,.7) 0 1px 0 inset,rgba(28,31,36,.06) 0 0 0 1px,rgba(28,31,36,.04) 0 1px 2px;padding:20px;display:grid;gap:20px}",
      ".learnnify-widget *{box-sizing:border-box}",
      ".learnnify-widget h2,.learnnify-widget h3,.learnnify-widget p{margin:0}",
      ".learnnify-eyebrow{font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.06em;line-height:1;text-transform:uppercase;color:#6c727a}",
      ".learnnify-title{font-size:24px;line-height:1.3;font-weight:600;letter-spacing:-.015em}",
      ".learnnify-section{border-top:1px solid rgba(28,31,36,.10);padding-top:16px;display:grid;gap:12px}",
      ".learnnify-card{border:1px solid rgba(28,31,36,.06);border-radius:8px;box-shadow:rgba(255,255,255,.7) 0 1px 0 inset,rgba(28,31,36,.06) 0 0 0 1px,rgba(28,31,36,.04) 0 1px 2px;padding:16px;display:grid;gap:12px}",
      ".learnnify-row{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}",
      ".learnnify-button{border-radius:5px;border:1px solid rgba(28,31,36,.22);background:transparent;color:#1c1f24;padding:9px 18px;font-size:13px;font-weight:600;cursor:pointer}",
      ".learnnify-button:disabled{opacity:.35;cursor:not-allowed}",
      ".learnnify-choice{width:100%;text-align:left;margin-top:8px}",
      ".learnnify-choice-correct{border-color:#1c1f24}",
      ".learnnify-choice-incorrect{opacity:.65}",
      ".learnnify-muted{color:#6c727a}",
    ].join("");
    document.head.appendChild(style);
  }

  function createElement(tag, className, text) {
    var element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (text) {
      element.textContent = text;
    }

    return element;
  }

  function renderSlides(container, slides) {
    var section = createElement("section", "learnnify-section");
    var heading = createElement("div", "learnnify-row");
    heading.appendChild(createElement("p", "learnnify-eyebrow", "Summary slides"));
    section.appendChild(heading);

    if (!slides.length) {
      section.appendChild(createElement("p", "learnnify-muted", "No slides generated yet."));
      container.appendChild(section);
      return;
    }

    var index = 0;
    var card = createElement("article", "learnnify-card");
    var title = createElement("h3", null);
    var content = createElement("p", null);
    var counter = createElement("p", "learnnify-eyebrow");
    var previous = createElement("button", "learnnify-button", "Previous");
    var next = createElement("button", "learnnify-button", "Next");

    previous.type = "button";
    next.type = "button";

    function update() {
      var slide = slides[index];
      title.textContent = slide.title;
      content.textContent = slide.content;
      counter.textContent = "Slide " + (index + 1) + " / " + slides.length;
      previous.disabled = index === 0;
      next.disabled = index === slides.length - 1;
    }

    previous.addEventListener("click", function () {
      if (index > 0) {
        index -= 1;
        update();
      }
    });
    next.addEventListener("click", function () {
      if (index < slides.length - 1) {
        index += 1;
        update();
      }
    });

    card.appendChild(counter);
    card.appendChild(title);
    card.appendChild(content);

    var controls = createElement("div", "learnnify-row");
    controls.appendChild(previous);
    controls.appendChild(next);
    card.appendChild(controls);
    section.appendChild(card);
    container.appendChild(section);
    update();
  }

  function renderQuizzes(container, quizzes) {
    var section = createElement("section", "learnnify-section");
    section.appendChild(createElement("p", "learnnify-eyebrow", "Knowledge check"));

    if (!quizzes.length) {
      section.appendChild(createElement("p", "learnnify-muted", "No quizzes generated yet."));
      container.appendChild(section);
      return;
    }

    quizzes.forEach(function (quiz) {
      var card = createElement("article", "learnnify-card");
      var feedback = createElement("p", "learnnify-muted");
      card.appendChild(createElement("p", "learnnify-eyebrow", "Question " + quiz.order));
      card.appendChild(createElement("h3", null, quiz.question));

      quiz.choices.forEach(function (choice, index) {
        var button = createElement("button", "learnnify-button learnnify-choice", choice);
        button.type = "button";
        button.addEventListener("click", function () {
          var correct = index === quiz.correctChoiceIndex;
          button.className += correct
            ? " learnnify-choice-correct"
            : " learnnify-choice-incorrect";
          feedback.textContent = (correct ? "Correct. " : "Incorrect. ") + quiz.explanation;
        });
        card.appendChild(button);
      });

      card.appendChild(feedback);
      section.appendChild(card);
    });

    container.appendChild(section);
  }

  async function renderWidget(target, origin) {
    var articleId = target.getAttribute("data-article-id");

    if (!articleId) {
      target.textContent = "Missing article id.";
      return;
    }

    target.textContent = "Loading learning widget...";

    try {
      var response = await fetch(origin + "/api/embed/articles/" + encodeURIComponent(articleId));

      if (!response.ok) {
        throw new Error("Failed to load learning widget.");
      }

      var data = await response.json();
      var widget = createElement("div", "learnnify-widget");
      widget.appendChild(createElement("p", "learnnify-eyebrow", "Learnnify"));
      widget.appendChild(createElement("h2", "learnnify-title", data.title));
      renderSlides(widget, data.slides || []);
      renderQuizzes(widget, data.quizzes || []);
      target.textContent = "";
      target.appendChild(widget);
    } catch (error) {
      target.textContent =
        error instanceof Error ? error.message : "Failed to load learning widget.";
    }
  }

  function boot() {
    injectStyle();

    var origin = getServiceOrigin();
    var targets = document.querySelectorAll("[data-learning-widget][data-article-id]");
    targets.forEach(function (target) {
      renderWidget(target, origin);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
