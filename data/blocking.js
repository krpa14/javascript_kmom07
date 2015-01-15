
//Convert the text regex strings sent as an array from main.js to an array of RegExp's
var regexes = []
for (var i = 0; i < self.options.regexes.length; i++) {
    regexes.push(new RegExp(self.options.regexes[i]));
}


//Get all img tags
var imgsElements = document.querySelectorAll("img");
//Check the img.src against the regexes
for (var i = 0; i < imgsElements.length; i++) {
    for (var r = 0; r < regexes.length; r++) { 
        if (regexes[r].test(imgsElements[i].src)) {
            imgsElements[i].src = "";
        }
    }
}

