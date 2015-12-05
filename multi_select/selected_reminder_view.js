require.loadCss({content: __inline('/widgets/multi_select/selected_reminder_view.scss')});

var template = __inline('/widgets/multi_select/selected_reminder_view.html');

var SelectedReminderView = Marionette.ItemView.extend({
  className: 'selected-reminder-view',
  tagName: 'span',
  template: _.template(template, {variable: 'data'}),
  templateHelpers: function () {
    return {
      targetName: this.getOption('targetName')
    }
  },

  events: {
    'click .rm-btn': 'unselect',
  },

  unselect: function () {
    this.model.trigger('destroy', this.model);
  },

});

module.exports = SelectedReminderView;
