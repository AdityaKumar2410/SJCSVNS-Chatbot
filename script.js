const apiKey =
  "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"; //api key

const institutionData = `
St Joseph Convent School was founded in 1950 by OUR LADY OF PROVIDENCE. 
It is located in Varanasi. 
It offers education in both English and Hindi medium to poor students. 
It is one of the most respected institutions in Varanasi, continuing its unwavering legacy. 
The present Principal is Sister Arul and Manager is Sr. Vimala. 
There are many highly trained teachers.
`;

async function getCompletion() {
  const input = document.querySelector("#message");
  const chatArea = document.querySelector("#chatArea");
  const userMessage = input.value.trim();
  if (!userMessage) return;

  
  addMessage(userMessage, "user");

  
  input.value = "";

  
  const thinkingBubble = addMessage("Thinking...", "bot");

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b:free",
        messages: [
          {
            role: "system",
            content: "You are a chatbot for St Joseph Convent School. You are specialized in answering questions about the school, but you can also answer general questions. Always be short, elegant, and precise. Do not use ** or double quotes in your answer."
          },
          { role: "system", content: institutionData },
          { role: "user", content: userMessage }
        ],
      }),
    });

    const data = await response.json();
    const output = data.choices[0].message.content;

    console.log(output);
    thinkingBubble.textContent = output;

    // Speak the answer
    // speak(output);

    
    chatArea.scrollTop = chatArea.scrollHeight;

  } catch (error) {
    thinkingBubble.textContent = "Error: Could not get a response.";
    console.error(error);
  }
}

function addMessage(text, sender) {
  const chatArea = document.querySelector("#chatArea");
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  msgDiv.textContent = text;
  chatArea.appendChild(msgDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
  return msgDiv;
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN"; // Indian English accent
  utterance.rate = 1; // normal speed
  speechSynthesis.speak(utterance);
}
document.addEventListener("contextmenu", function(event) {
      event.preventDefault();
      alert("Right-click is disabled on this page!");
    });