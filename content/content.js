chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.command === "parse-questions") {
        const questions = document.querySelectorAll('[role="list"]').item(0);
        let text = "";
        questions.childNodes.forEach(function(question) {
            question = question.children.item(0).children.item(0);

            let questionText = question.children.item(0).innerText.trim();
            let answers = question.children.item(1)?.innerText.trim();

            if (questionText) {
                questionText = questionText.split('\n').join(' ');

                if (questionText.includes(' * ')) {
                    questionText = questionText.replace('*', ' ');
                }

                questionText = questionText.trim();
            }

            if (answers) {
                answers = answers.split('\n').map((answer, index) => {
                    index = index + 1;
                    return `${index} ${answer}`;
                }).join('\n');
            }

            text += `
=====================================
${questionText} обери відповідь
${answers}
=====================================
`;
        });

        chrome.runtime.sendMessage({ command: "questions-parsed", text: text });
    }
});
