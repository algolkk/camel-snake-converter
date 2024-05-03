$(document).ready(function () {
    /**
     * Convert
     */
    $("#convert").on("click", function () {
        var text = $("#value").val();
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

    /**
     * Toastify
     */
    function copyToClipboard(sourceId) {
        var textToCopy = $(sourceId).text();
        navigator.clipboard.writeText(textToCopy).then(
            function () {
                showToast("Copied!", "success");
            },
            function (err) {
                showToast("Error!", "error");
            }
        );
    }

    function showToast(message, type) {
        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: type === "success" ? "#20c997" : "#dc3545",
        }).showToast();
    }
});
