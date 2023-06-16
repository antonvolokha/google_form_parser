document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("parse-questions");
    button.addEventListener("click", function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { command: "parse-questions" });
        });
    });
});
