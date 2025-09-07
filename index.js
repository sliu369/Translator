import OpenAI from "openai";

const client = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: import.meta.env.VITE_API_KEY, // Use the API key from the environment variable
});

document.querySelector(".translate-btn").addEventListener("click", async () => {
    const text = document.querySelector(".user-input").value;
    const initialLanguage = document.querySelector(".initial-language").value;
    const resultLanguage = document.querySelector(".result-language").value;

    if (text) {
        try {
            const response = await translate(text, initialLanguage, resultLanguage);
            renderResponse(response);
        } catch (error) {
            console.error("Error during translation:", error);
        }
    } else {
        console.log("Text not valid for translation");
    }
});

async function translate(text, initialLanguage, resultLanguage) {
    const messages = [
        {
            role: "system",
            content: `Translate whatever in user input from ${initialLanguage} to ${resultLanguage}, respond with the translated content only, if the user language does not seem to be ${initialLanguage}, say: the entered text does not seem to be ${initialLanguage}, please try again`,
        },
        {
            role: "user",
            content: text,
        },
    ];

    const response = await client.chat.completions.create({
        model: "gpt-4",
        messages: messages,
        temperature: 0,
    });

    return response.choices[0].message.content;
}

function renderResponse(response) {
    document.querySelector(".result-output").textContent = response;
}

