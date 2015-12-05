require.loadCss({content: __inline('/widgets/multi_select/multi_select_view.scss')});

var template = __inline('/widgets/multi_select/multi_select_view.html'),
  RemindersView = require('widgets/multi_select/reminders_view'),
  SelectedRemindersView = require('widgets/multi_select/selected_reminders_view');

var MultiSelectView = Marionette.LayoutView.extend({
  className: 'multi-select-view',
  template: _.template(template, {variable: 'data'}),
  templateHelpers: function () {
    return {
      targetName: this.getOption('displayedKey'),
      inputDefaults: this.collection.toJSON()
    }
  },

  regions: {
    reminderViewRegion: '.reminder-view-container',
    selectedViewRegion: '.selected-view-container',
  },

  ui: {
    input: 'input',
    reminder: '.reminder-view-container',
    selected: '.selected-view-container',
  },

  events: {
    'keyup input': 'detectKey',
    'focus input': 'display',
    'blur input': 'hide',
  },

  childEvents: {
    'select:reminder': 'select',
  },

  displayedKey: 'name',

  onRender: function () {
    this.renderReminderViewRegion();
    this.renderSelectedRemindersViewRegion();
  },

  renderReminderViewRegion: function () {
    this.remindersView = new RemindersView({
      collection: this.getOption('reminders'),
      displayedKey: this.getOption('displayedKey'),
    });

    this.reminderViewRegion.show(this.remindersView);
  },

  renderSelectedRemindersViewRegion: function () {
    this.selectedViewRegion.show(new SelectedRemindersView({
      collection: this.collection,
      targetName: this.getOption('displayedKey'),
    }));
  },

  detectKey: function(key) {
    var keycode = (key.keyCode ? key.keyCode : key.which);
    if (keycode == '13') {
      var value = this.ui.input.val().trim();
      if (!value) { return; }

      // 如果输入中有 || 这两个连续的字符，则把他们作为分隔符。
      var self = this;
      this.collection.add(_.map(value.split('||'), function (val) {
        var obj = {};
        obj[self.getOption('displayedKey')] = val;
        return obj;
      }));

      this.ui.input.val('');
    } else {
      this.changeFilter();
    }
  },

  changeFilter: function () {
    var vals = this.ui.input.val().trim().split(' ');

    var self = this;
    this.remindersView.filter = function (child, index, collection) {
      var filter = {};
      filter[self.getOption('displayedKey')] = child.get(self.getOption('displayedKey'));

      if (self.collection.findWhere(filter)) return false;
      if (child.get(self.getOption('displayedKey')).match(vals.join('.*'))) return true;
      return false;
    };
    this.remindersView._renderChildren();
  },

  display: function () {
    this.changeFilter();
    this.ui.reminder.css({display: 'block'});
  },

  hide: function () {
    setTimeout(function () {
      this.ui.reminder.css({display: 'none'});
    }.bind(this), 300);
  },

  select: function (view, reminder) {
    if (this.collection.findWhere(reminder)) return;
    this.collection.add(reminder);
  },

});

module.exports = MultiSelectView;
