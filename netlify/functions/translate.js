import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Use the API key from the Netlify environment variable
});

export async function handler(event, context) {
  try {
    const body = JSON.parse(event.body); // parse request body
    const userMessage = body.message;    // user input
    const initialLanguage = body.initialLanguage;
    const resultLanguage = body.resultLanguage;

    const response = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        {   
            role: "system", 
            content: `Translate whatever in user input from ${initialLanguage} to ${resultLanguage}, 
                        response only with translated text without any additional information. If the user input
                        does not seem to be ${initialLanguage}, respond with: The provided text is not in ${initialLanguage}.` 
        },

        { role: "user", content: userMessage },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.choices[0].message),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
