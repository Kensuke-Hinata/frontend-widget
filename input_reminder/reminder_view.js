require.loadCss({content: __inline('/widgets/input_reminder/reminder_view.scss')});

var template = __inline('/widgets/input_reminder/reminder_view.html'),
  ReminderView = Marionette.ItemView.extend({
    className: 'reminder-view',
    template: _.template(template, {variable: 'data'}),
    templateHelpers: function () {
      return {
        displayedKey: this.getOption('displayedKey')
      }
    },

    events: {
      'click': 'select',
    },

//    onRender: function () {
//      console.log(this.model.toJSON());
//    },

    select: function () {
      this.triggerMethod('select:reminder', this.model.toJSON());
    },

  });

module.exports = ReminderView;
