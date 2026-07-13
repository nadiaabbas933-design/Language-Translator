// ======================
// Get HTML Elements
// ======================

const inputText = document.getElementById("inputText");
const sourceLang = document.getElementById("sourceLang");
const targetLang = document.getElementById("targetLang");
const translateBtn = document.getElementById("translateBtn");
const outputText = document.getElementById("outputText");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const swapBtn = document.getElementById("swapBtn");
const speakBtn = document.getElementById("speakBtn");

// ======================
// Translate
// ======================

translateBtn.addEventListener("click", async () => {

    const text = inputText.value.trim();

    if (text === "") {
        alert("Please enter some text.");
        return;
    }

    if (sourceLang.value === targetLang.value) {
        alert("Source and Target language cannot be the same.");
        return;
    }

    translateBtn.disabled = true;
    translateBtn.innerHTML = "Translating...";

    try {

        const response = await fetch("/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text,
                source: sourceLang.value,
                target: targetLang.value
            })
        });

        if (!response.ok) {
            throw new Error("Translation Failed");
        }

        const data = await response.json();

        outputText.value = data.translated;

    } catch (error) {

        console.error(error);
        alert("Translation Failed!");

    } finally {

        translateBtn.disabled = false;
        translateBtn.innerHTML = "Translate";

    }

});

// ======================
// Copy
// ======================

copyBtn.addEventListener("click", () => {

    if (outputText.value.trim() === "") {
        alert("Nothing to Copy!");
        return;
    }

    navigator.clipboard.writeText(outputText.value);

    alert("Copied Successfully!");

});

// ======================
// Clear
// ======================

clearBtn.addEventListener("click", () => {

    inputText.value = "";
    outputText.value = "";

});

// ======================
// Swap Languages
// ======================

swapBtn.addEventListener("click", () => {

    const tempLang = sourceLang.value;
    sourceLang.value = targetLang.value;
    targetLang.value = tempLang;

    const tempText = inputText.value;
    inputText.value = outputText.value;
    outputText.value = tempText;

});

// ======================
// Speak
// ======================

speakBtn.addEventListener("click", () => {

    const text = outputText.value.trim();

    if (text === "") {
        alert("Nothing to Speak!");
        return;
    }

    // Stop any previous speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Use selected target language
    utterance.lang = targetLang.value;

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);

});