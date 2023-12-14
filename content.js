document.addEventListener("mouseup", (event) => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        chrome.runtime.sendMessage({
            action: "fetchContextualInsights",
            text: selectedText
        }, (response) => {
            alert("Contextual Insight: " + response.result);
        });
    }
});

/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received:", request); // Debug log
    if (request.action === "fetchContextualInsights") {
      if (document.readyState === "complete") {
        displayInsightsUI(request.text);
      } else {
        console.error("Page context is not available.");
      }
    }
    return true;
  });
  
  function displayInsightsUI(text) {
    console.log("Displaying insights for:", text); // Debug log
    // Remove existing UI if it exists
    let existingUI = document.getElementById('insightsUI');
    if (existingUI) {
      existingUI.remove();
    }
  
    // Create the UI elements
    let insightsContainer = createInsightsContainer();
    let title = createTitleElement();
    let insightText = createInsightTextElement(text);
    let closeButton = createCloseButton(insightsContainer);
  
    // Append elements
    insightsContainer.appendChild(title);
    insightsContainer.appendChild(insightText);
    insightsContainer.appendChild(closeButton);
  
    // Append the container to the body of the page
    document.body.appendChild(insightsContainer);
  
    // Fetch and display the actual insights
    fetchInsights(text, (insights) => {
      insightText.textContent = insights;
    });
  }
  
  function createInsightsContainer() {
    let container = document.createElement('div');
    container.id = 'insightsUI';
    return container;
  }
  
  function createTitleElement() {
    let title = document.createElement('h3');
    title.textContent = 'Contextual Insights';
    return title;
  }
  
  function createInsightTextElement(text) {
    let insightText = document.createElement('p');
    insightText.textContent = 'Fetching insights for: ' + text;
    return insightText;
  }
  
  function createCloseButton(container) {
    let closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.onclick = function() {
      container.remove();
    };
    return closeButton;
  }
  
  function fetchInsights(text, callback) {
    setTimeout(() => {
      callback("Insights for: " + text);
    }, 1000);
  }
  */