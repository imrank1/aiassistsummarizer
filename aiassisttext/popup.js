async function callOpenAIApi(text) {
    // const response = await fetch('https://your-server.com/summarize', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ text: text })
    // });
    // const result = await response.json();
    // return result.summary;
    return 'This is a summary of the selected text.';
  }
  
  function updateSummary(summary) {
    document.getElementById('summary').textContent = summary;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.executeScript(
      {
        code: 'window.getSelection().toString();'
      },
      async (selectedTextArray) => {
        const selectedText = selectedTextArray[0];
        if (selectedText) {
          const summary = await callOpenAIApi(selectedText);
          updateSummary(summary);
        } else {
          updateSummary('No text selected. Please select text and try again.');
        }
      }
    );
  });
  