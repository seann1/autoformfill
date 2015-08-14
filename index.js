var self = require("sdk/self");
var tabs = require("sdk/tabs");

var button = require("sdk/ui/button/action").ActionButton({
  id: "style-tab",
  label: "Style Tab",
  icon: "./icon-16.png",
  onClick: function() {
    var worker = tabs.activeTab.attach({
      contentScriptFile: [self.data.url("jquery.min.js"), self.data.url("faker.min.js"), self.data.url("script.js")]
    });
    worker.port.emit("fillForm");
  }
});