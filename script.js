$(document).ready(function () {
    /**
     * Convert
     */
    $("#value").on("change", function () {
        var text = $(this).val();
        var caseType = detectCaseType(text);

        $("#camel").text(convert2CamelCase(text, caseType));
        $("#snake").text(convert2SnakeCase(text, caseType));
        $("#pascal").text(convert2PascalCase(text, caseType));
    });

    function convert2CamelCase(text, caseType) {
        if (caseType === "camel") return text;
        return text
            .replace(/[-_\s]([a-zA-Z0-9])/g, function (match, char) {
                return char.toUpperCase();
            })
            .replace(/^([A-Z])/, function (match, char) {
                return char.toLowerCase();
            });
    }

    function convert2SnakeCase(text, caseType) {
        if (caseType === "snake") return text;
        return text
            .replace(/[A-Z]/g, function (match) {
                return "_" + match.toLowerCase();
            })
            .replace(/^_/, "");
    }

    function convert2PascalCase(text, caseType) {
        return text
            .replace(/(^\w|-\w|_\w|\s\w)/g, function (match) {
                return match.charAt(match.length - 1).toUpperCase();
            })
            .replace(/[-_\s]/g, "");
    }

    function detectCaseType(text) {
        if (/^[a-z][a-zA-Z0-9]*$/.test(text)) {
            return "camel";
        } else if (/^[A-Z][a-zA-Z0-9]*$/.test(text)) {
            return "pascal";
        } else if (/^[a-z]+(_[a-z]+)*$/.test(text)) {
            return "snake";
        } else {
            return "unknown";
        }
    }

    /**
     * Copy to clipboard
     */
    $("#copyCamel").on("click", function () {
        copyToClipboard("#camel");
    });

    $("#copySnake").on("click", function () {
        copyToClipboard("#snake");
    });

    $("#copyPascal").on("click", function () {
        copyToClipboard("#pascal");
    });

    function copyToClipboard(sourceId) {
        var textToCopy = $(sourceId).text();
        navigator.clipboard.writeText(textToCopy).then(
            function () {
                $("#message").text("Copied");
            },
            function (err) {
                $("#message").text("Error");
            }
        );
    }
});
