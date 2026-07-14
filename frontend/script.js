// ================================
// Language Translator Script
// Developed by Nadia Abbas
// ================================

// ---------- Get Elements ----------

const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const sourceLang = document.getElementById("sourceLang");
const targetLang = document.getElementById("targetLang");

const translateBtn = document.getElementById("translateBtn");
const copyBtn = document.getElementById("copyBtn");
const speakBtn = document.getElementById("speakBtn");
const clearBtn = document.getElementById("clearBtn");
const swapBtn = document.getElementById("swapBtn");

// ---------- Language Map ----------

const languageMap = {
    en: "en-US",
    ur: "ur-PK",
    fr: "fr-FR",
    de: "de-DE",
    es: "es-ES",
    ar: "ar-SA",
    hi: "hi-IN",
    ja: "ja-JP"
};

// ================================
// Translate
// ================================

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
    translateBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Translating...';

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

            throw new Error("Server Error");

        }

        const data = await response.json();

        console.log("Translated:", data.translated);

outputText.value = data.translated;

console.log("Textarea:", outputText.value);

    }

    catch (error) {

        console.error(error);

        alert("Translation Failed!");

    }

    finally {

        translateBtn.disabled = false;

        translateBtn.innerHTML =
            '<i class="fa-solid fa-language"></i> Translate';

    }

});
// ================================
// Copy Button
// ================================

copyBtn.addEventListener("click", async () => {

    const text = outputText.value.trim();

    if (text === "") {
        alert("Nothing to Copy!");
        return;
    }

    try {

        await navigator.clipboard.writeText(text);

        copyBtn.innerHTML =
            '<i class="fa-solid fa-check"></i> Copied';

        setTimeout(() => {

            copyBtn.innerHTML =
                '<i class="fa-solid fa-copy"></i> Copy';

        }, 1500);

    } catch {

        alert("Copy Failed!");

    }

});


// ================================
// Clear Button
// ================================

clearBtn.addEventListener("click", () => {

    inputText.value = "";
    outputText.value = "";

    inputText.focus();

});


// ================================
// Swap Languages
// ================================

swapBtn.addEventListener("click", () => {

    const tempLang = sourceLang.value;
    sourceLang.value = targetLang.value;
    targetLang.value = tempLang;

    const tempText = inputText.value;
    inputText.value = outputText.value;
    outputText.value = tempText;

});


// ================================
// Speak Button
// ================================

// ================================
// Speak Button
// ================================

// ================================
// Speak Button
// ================================

// ================================
// Speak Button
// ================================

// ======================
// Speak
// ======================

// ======================
// Speak
// ======================

speakBtn.addEventListener("click", () => {

    console.log("Speak button clicked");

    const text = outputText.value.trim();

    if (!text) {
        alert("Nothing to Speak!");
        return;
    }

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    speechSynthesis.speak(utterance);

});