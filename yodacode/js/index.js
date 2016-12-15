
var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.getSession().setMode("ace/mode/javascript");

editor.setOptions({
  fontSize: "18px",
  cursorStyle: "wide"
});


// define clear function
function force_clear() {
    $("#inject").html("");
}

var refreshRate = 0.1;
var buffer = editor.getValue();
setInterval(function() {
    
    if (buffer != editor.getValue()) {
        // Run JSHINT to look for errors
        JSHINT(editor.getValue(), {}, {});

        if (JSHINT.errors.length == 0) {
            $("#inject").empty();
            var el = document.createElement("script");
            el.innerHTML = editor.getValue();
            $("#inject").append(el);     
        } else {
            console.log("Erorr");
        }
    }
    buffer = editor.getValue();
}, refreshRate*1000);