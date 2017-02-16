"use strict";

/** lambang 1.0.0 */

/**
 * Takes highest-level
 * lambang syntax and produces
 * plain syntax functions.
 */
function LAMBANG(string) {
    var regexp = /([_a-zA-Z][_a-zA-Z0-9]+!) ({)/ig;
    var match = regexp.exec(string);

    var matches = [];
    while (match !== null) {
        matches.push(match);
        match = regexp.exec(string);
    }

    for (var match of matches) {
        var function_name = match[0]
            .replace("{", "")
            .replace("!", "")
            .replace(" ", "");

        var plain_syntax  = "function " + function_name + "()" + "{";
        string = string.replace(match[0], plain_syntax);
    }

    return string;
}
