//Get the edit-box
var textArea = document.getElementById("edit-box");

var ok_button = document.getElementById("ok");
ok_button.addEventListener("click", function onclick(event) {
    text = textArea.value;
    self.port.emit("text-entered", text);
    textArea.value = '';
}, false);

// Listen for the "show" event being sent from the
// main add-on code. It means that the panel's about
// to be shown.
//
// Set the focus to the text area so the user can
// just start typing. And att existing text to the textarea.
self.port.on("show", function onShow(text) {
    textArea.value = text;
    textArea.focus();
});