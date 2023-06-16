chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.command === "questions-parsed") {
        const text = message.text;

        console.log(text);

        const blob = new Blob([text], { type: "text/plain" });

        const fileReader = new FileReader();
        fileReader.readAsDataURL(blob);
        fileReader.onload = function() {
            const base64String = this.result.split(',')[1];

            console.log(base64String);
            chrome.downloads.download({
                url: `data:text/plain;base64,${base64String}`,
                filename: "questions.txt"
            });
        };
    }
});
