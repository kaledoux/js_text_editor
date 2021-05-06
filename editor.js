// 1 Scope
//   - rich text editor
//     text area for typing out text content that will render different effects
//     effect options:
//       - Make text bold.
//       - Italicize text.
//       - Underline text.
//       - Strike-through text.
//       - Create a link from some text.
//       - Create an unordered list.
//       - Create an ordered list.
//       - Align text to the right, left, center, and fully-justified.
//     - buttons to enable each of the effects
//       - multiple effects active simultaneously
//   -Improvements:
//     - drop down list for font family
//     - button to increase/decrease font size
//     - color of text dropdown
//     - click a button to erase/cut all content
//
// 2 Overview
//   - a basic div setup with a box to type text in
//   - button box to select effects
//     - each button has event listener that will send execCommand(name)
//
//   DOMUpdater
//     - register templates
//     - build buttons
//
//   TextEditor
//     - bind listeners on construction
//     - handle execCommand based on value in button/event target
//
// 3 PEDAC
// DOMUpdater
// constructor
//   registerHandlebarsTemplates
// methods
// registerHandlebarsTemplates() {
//   this.templates = {};
//   document.querySelectorAll("script[type='text/x-handlebars-template']")
//     .forEach(template => {
//       this.templates[template.getAttribute('id')] = Handlebars.compile(template.innerHTML);
//     });
//   document.querySelectorAll("[data-type=partial]").forEach(template => {
//     Handlebars.registerPartial(template['id'], template['innerHTML']);
//   });
// buildButtons() {
//   const buttonTypes = [effect types herein];
//   calls this.buildButtons and sets result to innerHTML of
//     document.querySelector('.effect_options')
// }
// }
//
// TextEditor
// constructor
//   build DOMUpdater instance
//   call DOMUpdater to build out buttons
//   bindListeners
// methods
//   bind listeners
//     querySelector for .effect_options
//     on click
//       if event.target has class "option"
//       call this.pressEffectButton(effect)
//   pressEffectButton(effect)
//     document.execCommand(effect)
//
// 4 Diagram
// DOMUpdater => compiles templates, static method to build buttons, used by =>
// TextEditor => uses DOMUpdater to build buttons and then attaches listeners to them

class DOMUpdater {
  constructor() {
    this.registerHandlebarsTemplates();
    this.buildButtons();
  }
  registerHandlebarsTemplates() {
    this.templates = {};
    document.querySelectorAll("script[type='text/x-handlebars-template']")
      .forEach(template => {
        this.templates[template.getAttribute('id')] = Handlebars.compile(template.innerHTML);
      });
    document.querySelectorAll("[data-type=partial]").forEach(template => {
      Handlebars.registerPartial(template['id'], template['innerHTML']);
    });
  }
  buildButtons() {
    const buttonTypes = {
      buttons: ['bold', 'italic', 'underline', 'strikeThrough',
                'insertOrderedList', 'insertUnorderedList', 'createLink',
                'justifyLeft', 'justifyCenter', 'justifyRight', ]
    };
    const html = this.templates.buildButtons(buttonTypes);
    document.querySelector('.effect_options').innerHTML = html;
  }
}

class TextEditor {
  constructor() {
    this.updater = new DOMUpdater();
    this.updater.buildButtons();
    this.bindListeners();
  }
  bindListeners() {
    const effectsBar = document.querySelector('.effect_options');
    effectsBar.addEventListener('click', (event) => {
      if (event.target.classList.contains('option')) {
        const effect = event.target.getAttribute('data-effect');
        this.pressEffectButton(effect);
      }
    });
  }
  pressEffectButton(effect) {
    document.execCommand(effect);
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  new TextEditor();
});
