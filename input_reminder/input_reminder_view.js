require.loadCss({content: __inline('/widgets/input_reminder/input_reminder_view.scss')});

var template = __inline('/widgets/input_reminder/input_reminder_view.html'),
  ReminderView = require('widgets/input_reminder/reminder_view'),

  InputReminderView = Marionette.CompositeView.extend({
    className: 'input-reminder-view',
    template: _.template(template, {variable: 'data'}),
    childView: ReminderView,
    childViewContainer: '.reminder-view-container',
    childViewOptions: function () {
      return {
        displayedKey: this.getOption('displayedKey')
      }
    },

    templateHelpers: function () {
      return {
        name: this.getOption('name'),
        inputDefault: this.getOption('inputDefault'),
        valDefault: this.getOption('valDefault')
      }
    },

    ui: {
      input: 'input',
      reminder: '.reminder-view-container'
    },

    events: {
      'keyup input': 'changeReminders',
      'focus input': 'display',
      'blur input': 'hide',
    },

    childEvents: {
      'select:reminder': 'select',
    },

    displayedKey: 'name',

    filter: function (child, index) {
      var vals = this.ui.input.val().trim().split(' ');

      if ((child.get(this.getOption('displayedKey')) + '').match(vals.join('.*'))) return true;
      return false;
    },

    changeReminders: function () {
      this._renderChildren(); // otherwise input content would be re-rendered.
    },

    display: function () {
      this.ui.reminder.css({display: 'block'});
    },

    hide: function () {
      setTimeout(function () {
        this.ui.reminder.css({display: 'none'});
      }.bind(this), 300);
    },

    select: function (view, reminder) {
      this.ui.input.val(reminder[this.getOption('displayedKey')]);
      this.ui.input.data('val', reminder[this.getOption('valKey')]);
      this.ui.input.trigger('change');
    },
  });

module.exports = InputReminderView;
