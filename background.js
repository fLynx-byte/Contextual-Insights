function getOpenAIResponse(apiKey, text, sendResponse) {
    const data = {
        "model": "text-davinci-003", 
        "prompt": "Give me a 100 words Contextual Insights about: " + text,
        "temperature": 0.7,
        "max_tokens": 150
    };

    fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + apiKey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => sendResponse({ result: data.choices[0].text }))
    .catch(error => console.error('Error:', error));
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchContextualInsights") {
        chrome.storage.local.get("apiKey", (storage) => {
            getOpenAIResponse(storage.apiKey, request.text, sendResponse);
        });
    }
    return true; // Keep the message channel open for asynchronous response
});

/*
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "fetchContextualInsights",
      title: "Get Insights",
      contexts: ["selection"]
    });
  });
  

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "fetchContextualInsights" && info.selectionText) {
      chrome.tabs.sendMessage(tab.id, {
        action: "fetchContextualInsights",
        text: info.selectionText
      });
    }
});
  
function fetchInsights(selectedText) {
    chrome.runtime.sendMessage({
      action: "fetchContextualInsights",
      text: selectedText
    });
}
*/

