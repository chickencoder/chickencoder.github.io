function inject(code) {
    var el = document.createElement("script");
    el.innerHTML = code;
    $("#injected_code_goes_here").empty();
    $("#injected_code_goes_here").append(el); 
}

$(function() {
    // Setup editor
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/ambiance");
    editor.getSession().setMode("ace/mode/javascript");

    editor.setOptions({
        fontSize: "18px",
        cursorStyle: "wide",
        displayIndentGuides: false,
        showPrintMargin: false,
        showGutter: false
    });

    $(window).on('resize', function() {
        $("canvas").css("width", window.innerWidth);
        $("canvas").css("height", window.innerHeight);
    });

    $("#run").click(function() {
        var code = LAMBANG(editor.getValue());
        JSHINT(code, {}, {});

        $("#editor").toggleClass("shadow");
        setTimeout(function() {
            $("#editor").removeClass("shadow");
        }, 100);

        if (JSHINT.errors.length == 0) {
            inject(code); 
        } else {
            console.log("Errors:", JSHINT.data());
        }
    });

    $("#halt").click(function() {
        inject("function draw() { background(0); }");
    });

    $(document).on("keydown", "#editor", function(e) {
        if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey) {
            var code = LAMBANG(editor.getValue());
            JSHINT(code, {}, {});

            // Animate Shadow
            $("#editor").toggleClass("shadow");
            setTimeout(function() {
                $("#editor").removeClass("shadow");
            }, 100);


            if (JSHINT.errors.length == 0) {
                inject(code); 
            } else {
                console.log("Errors:", JSHINT.data());
            }
        }
    });
   
});