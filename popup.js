// popup.js
document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.getElementById('saveApiKey');
  const apiKeyField = document.getElementById('apiKey');
  const message = document.getElementById('message');

  chrome.storage.local.get('apiKey', (data) => {
      if (data.apiKey) {
          apiKeyField.value = data.apiKey;
      }
  });

  saveButton.addEventListener('click', () => {
      const apiKey = apiKeyField.value;
      if (apiKey) {
          // Save the API key in local storage
          chrome.storage.local.set({ apiKey: apiKey }, () => {
              message.textContent = "API Key saved successfully!";
              setTimeout(() => {
                  // Close the popup after a delay (
                  window.close();
              }, 1000); // Close after 1 second 
          });
      } else {
          message.textContent = "Please enter a valid API Key.";
      }
  });
});
