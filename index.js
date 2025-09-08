document.addEventListener('DOMContentLoaded', function() {
    const translateBtn = document.querySelector('.translate-btn');
    const userInput = document.querySelector('.user-input');
    const resultOutput = document.querySelector('.result-output');
    const charCount = document.getElementById('char-count');
    
    // Character count functionality
    userInput.addEventListener('input', function() {
        const count = userInput.value.length;
        charCount.textContent = count;
        
        // Change color when approaching limit
        if (count > 350) {
            charCount.style.color = '#e63946';
        } else if (count > 300) {
            charCount.style.color = '#f4a261';
        } else {
            charCount.style.color = 'var(--text-light)';
        }
    });
    
    // Simple translation simulation for demo purposes
    translateBtn.addEventListener('click', async function() {
        if (userInput.value.trim() === '') {
            resultOutput.value = '';
            return;
        }
        
        // Show loading state
        translateBtn.innerHTML = 'Translating <i class="fas fa-spinner fa-spin"></i>';
        translateBtn.disabled = true;
    
        const fromLang = document.querySelector('.initial-language').value;
        const toLang = document.querySelector('.result-language').value;

        const translation = await getTranslate(userInput.value, fromLang, toLang)
        resultOutput.textContent = translation
            
            // Reset button
            translateBtn.innerHTML = 'Translate <i class="fas fa-language"></i>';
            translateBtn.disabled = false;
    });
    
    // Add some example text on load for demo
    userInput.value = "Hello, welcome to PollyGlot Translator. Enter your text and click translate to see it in action!";
    userInput.dispatchEvent(new Event('input'));
});

async function getTranslate(userInput, initialLang, resultLang) {
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