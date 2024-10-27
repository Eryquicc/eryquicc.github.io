document.addEventListener("DOMContentLoaded", () => {
    let typeText = document.getElementById('typing-text').innerHTML;
    document.getElementById('typing-text').innerHTML = "";  

    function bigTypingAnimation() {
        document.getElementById('typing-text').classList.add("noanimation");
        let text = document.getElementById('big-typing').innerHTML;
        document.getElementById('big-typing').innerHTML = "";
        let index = 0;

        const bigInterval = setInterval(function() {
            if (index === text.length) {
                clearInterval(bigInterval);
                document.getElementById('big-typing').classList.add("noanimation");
                setTimeout(typingAnimation, 0);
                return;
            }

            // Check for anchor tags and append them immediately
            if (text.substring(index, index + 3) === '<a ') {
                const endTagIndex = text.indexOf('</a>', index) + 4; // +4 to include closing tag
                // Remove the last ">" character if it is appended
                let anchorTag = text.substring(index, endTagIndex);
                if (anchorTag.endsWith('>')) {
                    anchorTag = anchorTag.slice(0, -1); // Remove the last ">"
                }
                document.getElementById('big-typing').innerHTML += anchorTag;
                index = endTagIndex; // Move index to the end of the anchor tag
            } else {
                document.getElementById('big-typing').innerHTML += text.charAt(index);
                index++;
            }
        }, 20);
    }

    function typingAnimation() {
        document.getElementById('typing-text').classList.remove("noanimation");
        let index = 0;

        const interval = setInterval(function() {
            if (index === typeText.length) {
                clearInterval(interval);
                return;
            }

            // Check for anchor tags and append them immediately
            if (typeText.substring(index, index + 3) === '<a ') {
                const endTagIndex = typeText.indexOf('</a>', index) + 4; // +4 to include closing tag
                // Remove the last ">" character if it is appended
                let anchorTag = typeText.substring(index, endTagIndex);
                if (anchorTag.endsWith('>')) {
                    anchorTag = anchorTag.slice(0, -1); // Remove the last ">"
                }
                document.getElementById('typing-text').innerHTML += anchorTag;
                index = endTagIndex; // Move index to the end of the anchor tag
            } else if (typeText.charAt(index) === '<') {
                // This part can be modified if you want to handle other HTML tags
                index += 3; // Skip to the end of the HTML tag (assuming it's <br>)
                document.getElementById('typing-text').innerHTML += "<br>";
            } else {
                document.getElementById('typing-text').innerHTML += typeText.charAt(index);
                index++; // Only increment if not dealing with an anchor or line break
            }

            // Trigger animation or transition for slide-in elements
            document.querySelectorAll('.slide-in-element').forEach((element) => {
                element.classList.add('slide-in');
            });
        }, 15);
    }

    bigTypingAnimation();

    function fadeInCheck() {
        var fadeInElements = document.querySelectorAll('.fade-in');
        fadeInElements.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight) {
                element.classList.add('fade-in-element');
            }
        });
    }

    window.addEventListener('scroll', fadeInCheck);
    fadeInCheck(); // Trigger the check when the page loads
});
