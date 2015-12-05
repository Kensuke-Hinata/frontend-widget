var template = __inline('/widgets/input_select/input_select_view.html'),
  css = require.loadCss({content: __inline('/widgets/input_select/input_select_view.scss')}),
  optionTmpl =
    '<% _.each(options, function (option) { %>' +
    '<li data-option="<%= option %>"><%= option %></li>' +
    '<% }) %>',

  InputSelectView = Marionette.ItemView.extend({
    className: 'input-with-options',
    template: _.template(template),
    optionTmpl: _.template(optionTmpl),

    ui: {
      input: '.text',
      suggestion: '.suggestion',
      suggestionItem: '.suggestion li'
    },

    events: {
      'focus @ui.input': 'showOptions',
      'blur @ui.input': 'hideOptions',
      'keyup @ui.input': 'filter',
      'click @ui.suggestionItem': 'pickItem'
    },

    initialize: function (options) {
      this.suggestionItems = options.suggestionItems;
    },

    onRender: function () {
      this.$('ul.options').html(this.optionTmpl({
        options: this.suggestionItems
      }));
    },

    setVal: function (val) {
      this.ui.input.val(val);
    },

    filter: function (e) {
      var value = this.$(e.currentTarget).val().trim(),
        options = _.filter(this.suggestionItems, function (item) {
        return new RegExp(value, 'i').test(item);
      });

      this.$('.suggestion').html(this.optionTmpl({
        options: options
      }));
    },

    pickItem: function (e) {
      var elm = this.$(e.currentTarget),
        option = elm.data('option');

      this.ui.input.val(option);
      this.hideOptions();
      this.triggerMethod('change:item', option);
    },

    showOptions: function () {
      this.ui.suggestion.addClass('show');
    },

    hideOptions: function () {
      this.ui.suggestion.removeClass('show');
    },
  });

module.exports = InputSelectView;
