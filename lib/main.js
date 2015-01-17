
// attach the blocking script to all pages when opening them
var tabs = require("sdk/tabs").on("load", runBlocker);

var self = require("sdk/self");
var buttons = require('sdk/ui/button/action');

//get the simple storage that contains the regexes for blocking ads
var ss = require("sdk/simple-storage");
if (!ss.storage.block_list) {
    ss.storage.block_list = [];
}
//Cheat when developing because simple storage is deleted at each restart
// ss.storage.block_list = ["static.fsf.org", "adtech.de"];

var data = require("sdk/self").data;
// Construct a panel, loading its content from the "edit_block.html"
// file in the "data" directory, and loading the "get-text.js" script
// into it.
var text_entry = require("sdk/panel").Panel({
    width: 700,
    height: 500,
    contentURL: data.url("edit_block.html"),
    contentScriptFile: data.url("get_text.js")
});

//Function to run on page load
function runBlocker(tab) {
    //Convert the stored regexes to json
    var regexes = JSON.stringify(ss.storage.block_list);
    tab.attach(
        {
            contentScriptFile: self.data.url("blocking.js"),
            // send regex json to blocking.js
            contentScriptOptions: {"regexes" : ss.storage.block_list}
        });
}

// Add a button to the Firefox ui
var button = buttons.ActionButton({
    id: "tmoz_blocker",
    label: "tmoz_blocker",
    icon: {
        "16": "./target-16.png",
        "32": "./target-32.png",
        "64": "./target-64.png"
    },
    onClick: handleClick
});



// Show the panel when the user clicks the button.
function handleClick(state) {
  text_entry.show();
}

// When the panel is displayed it generated an event called
// "show": we will listen for that event and when it happens,
// send our own "show" event to the panel's script, so the
// script can prepare the panel for display.
text_entry.on("show", function() {
    block_text = "";
    for (var i = 0; i < ss.storage.block_list.length; i++) {
        block_text += ss.storage.block_list[i] + "\n";
    }
    text_entry.port.emit("show", block_text);
});

// Listen for messages called "text-entered" coming from
// the content script. The message payload is the text the user entered.
// Save the regex in the permanent storage
text_entry.port.on("text-entered", function (text) {
    console.log(text);
    text_entry.hide();
    //Save to storage
    ss.storage.block_list = [];
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].trim() != "") {
            ss.storage.block_list.push(lines[i].trim());
        }
    }
});





