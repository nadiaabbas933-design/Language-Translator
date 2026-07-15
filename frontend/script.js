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
const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");
const status = document.getElementById("status");
const progressBar =
document.getElementById("progressBar");
const themeToggle = document.getElementById("themeToggle");
const toast=document.getElementById("toast");
const historyList =
document.getElementById("historyList");
const downloadBtn = document.getElementById("downloadBtn");
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
inputText.addEventListener("input", () => {

    const text = inputText.value;

    charCount.textContent =
        "Characters: " + text.length;

    const words = text.trim() === ""
        ? 0
        : text.trim().split(/\s+/).length;

    wordCount.textContent =
        "Words: " + words;
        const percentage =
(text.length / 5000) * 100;

progressBar.style.width =
percentage + "%";
if (text.length > 4500) {

    showToast("Character limit is almost reached!", "warning");

}

});

// ================================
// Translate
// ================================

translateBtn.addEventListener("click", async () => {

    const text = inputText.value.trim();

    if (text === "") {
        showToast("Please enter some text","warning");
        return;
    }

    //if (sourceLang.value === targetLang.value) {
      //  alert("Source and Target language cannot be the same.");
        //return;
   // }
   status.textContent = "Translating...";

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
localStorage.setItem("lastTranslation", data.translated);
addHistory(
inputText.value,
data.translated
);
status.textContent = "Translation Completed ✓";
status.className = "status-success";

console.log("Textarea:", outputText.value);

    }

   catch (error) {

    console.error(error);

    status.textContent = "Translation Failed";
    status.className = "status-error";

    showToast("Translation Failed","error");

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
        showToast("Nothing to Copy","warning");
        return;
    }

    try {

        await navigator.clipboard.writeText(text);

        copyBtn.innerHTML =
            '<i class="fa-solid fa-check"></i> Copied';

        setTimeout(() => {

            copyBtn.innerHTML =
                '<i class="fa-solid fa-copy"></i> Copy';
                copyBtn.style.transform = "scale(1.1)";
                

setTimeout(() => {

    clearBtn.style.transform = "rotate(0deg)";

},500);

setTimeout(() => {

    copyBtn.style.transform = "scale(1)";

}, 300);

        }, 1500);

    } catch {

    showToast("Copy Failed","error");

}

});


// ================================
// Clear Button
// ================================

clearBtn.addEventListener("click", () => {

    inputText.value = "";
    outputText.value = "";
    progressBar.style.width="0%";

    inputText.focus();
    status.textContent = "Ready to Translate";
    status.className = "";
    clearBtn.style.transform = "rotate(360deg)";

setTimeout(() => {

    clearBtn.style.transform = "rotate(0deg)";

},500);

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



speakBtn.addEventListener("click", () => {

    const text = outputText.value.trim();

    console.log("Speak Clicked");
    console.log("Text:", text);

    if (text === "") {
        showToast("Nothing to Speak","warning");
        return;
    }

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";

    utterance.onstart = () => {
        console.log("Speech Started");
    };

    utterance.onend = () => {
        console.log("Speech Ended");
    };

    utterance.onerror = (e) => {
        console.log("Speech Error:", e);
    };

    speechSynthesis.speak(utterance);

});
themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const icon = themeToggle.querySelector("i");

    if(document.body.classList.contains("dark-mode")){

        icon.className="fa-solid fa-sun";

    }else{

        icon.className="fa-solid fa-moon";

    }

});
function showToast(message,type="success"){

toast.textContent=message;

toast.className="show";

if(type==="error")
toast.classList.add("toast-error");

if(type==="warning")
toast.classList.add("toast-warning");

setTimeout(()=>{

toast.className="";

},2000);

}
function addHistory(original,translated){

const item=document.createElement("li");

item.innerHTML=`
<b>${original}</b>
<br>
<i class="fa-solid fa-arrow-right"></i>
${translated}
`;

historyList.prepend(item);

if(historyList.children.length>5){

historyList.removeChild(
historyList.lastChild
);

}

}
// ================================
// Ctrl + Enter Shortcut
// ================================

inputText.addEventListener("keydown", (e) => {

    if (e.ctrlKey && e.key === "Enter") {

        translateBtn.click();

    }

});
window.onload = () => {

    inputText.focus();

    const saved = localStorage.getItem("lastTranslation");

    if (saved) {

        outputText.value = saved;

    }

};
// ================================
// Download Translation
// ================================

downloadBtn.addEventListener("click", () => {

    const text = outputText.value.trim();

    if (text === "") {

        showToast("Nothing to Download", "warning");
        return;
    }

    const blob = new Blob([text], { type: "text/plain" });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "translation.txt";

    link.click();

    URL.revokeObjectURL(link.href);

    showToast("Downloaded Successfully");

});