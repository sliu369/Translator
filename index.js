import OpenAI from "openai";

const client = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: "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"
});

document.querySelector(".translate-btn").addEventListener("click", () => {
    const text = document.querySelector(".user-input").value
    const initialLanguage = document.querySelector(".initial-language").value
    const resultLanguage = document.querySelector(".result-language").value
    if (text){
        const response = translate(text, initialLanguage, resultLanguage)
        renderResponse(response)
    }
    else{
       console.log("text not valid for translation") 
    }
})

async function translate(text, initialLanguage, resultLanguage){
    const messages = [
        {
            role: "system",
            content: `Translate whatever in user input from ${initialLanguage} to ${resultLanguage}, respond with the translated content only, if the user language does not seems to be ${initialLanguage}, say: the entered text does not seems to be ${initialLanguage}, please try again`
        },

        {
            role: "user",
            content: text
        }
    ]

    const response = await client.chat.completions.create({
        model: "gpt-4",
        messages: messages,
        temperature: 0
    })

    return response.choices[0].message.content
}

function renderResponse(response){
    document.querySelector(".result-output").textContent = response
}

