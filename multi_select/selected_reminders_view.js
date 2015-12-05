var SelectedReminderView = require('widgets/multi_select/selected_reminder_view');

var SelectedRemindersView = Marionette.CollectionView.extend({
  className: 'selected-reminders-view',
  childView: SelectedReminderView,

  childViewOptions: function () {
    return {
      targetName: this.getOption('targetName')
    }
  },
});

module.exports = SelectedRemindersView;
