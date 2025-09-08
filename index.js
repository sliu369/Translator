document.querySelector(".translate-btn").addEventListener("click", async () => {
    const text = document.querySelector(".user-input").value;
    const initialLanguage = document.querySelector(".initial-language").value;
    const resultLanguage = document.querySelector(".result-language").value;

    if (text) {
        try {
            const response = await sendMessage(text, initialLanguage, resultLanguage);
            renderResponse(response);
        } catch (error) {
            console.error("Error during translation:", error);
        }
    } else {
        console.log("Text not valid for translation");
    }
});

async function sendMessage(userInput, initialLang, resultLang) {
  const res = await fetch("/.netlify/functions/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: userInput,   //sending user input
        initialLanguage: initialLang,
        resultLanguage: resultLang
    }),
  });

  const data = await res.json();
  console.log(data);
  return data.content;
}

function renderResponse(response) {
    document.querySelector(".result-output").textContent = response;
}

