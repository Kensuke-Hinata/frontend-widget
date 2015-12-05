var ReminderView = require('widgets/input_reminder/reminder_view');

var RemindersView = Marionette.CollectionView.extend({
  className: 'reminders-view',
  childView: ReminderView,
  childViewOptions: function () {
    return {
      displayedKey: this.getOption('displayedKey')
    }
  },

});

module.exports = RemindersView;
