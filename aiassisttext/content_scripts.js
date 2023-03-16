let tooltip = null;
let serverUrl = 'http://localhost:4000/summarize';

function createTooltip() {
  tooltip = document.createElement('div');
  tooltip.id = 'summary-tooltip';
  tooltip.style.display = 'none';
  document.body.appendChild(tooltip);
}

function removeTooltip() {
  if (tooltip) {
    tooltip.remove();
    tooltip = null;
  }
}

function updateTooltip(summary) {
  if (tooltip) {
    tooltip.textContent = summary;
  }
}

function showTooltip(e) {
  if (tooltip) {
    tooltip.style.top = `${e.pageY + 20}px`;
    tooltip.style.left = `${e.pageX}px`;
    tooltip.style.display = 'block';
  }
}

function hideTooltip() {
  if (tooltip) {
    tooltip.style.display = 'none';
  }
}

async function fetchSummary(text) {
  const response = await fetch(serverUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: text })
  });
  const result = await response.json();
  return result.summary;

//   return 'This is a summary of the selected text.';
}

document.addEventListener('mouseup', async (e) => {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText.length > 0) {
    if (!tooltip) {
      createTooltip();
    }
    const summary = await fetchSummary(selectedText);
    updateTooltip(summary);
    showTooltip(e);
  } else {
    removeTooltip();
  }
});

document.addEventListener('mousemove', (e) => {
  if (tooltip) {
    if (window.getSelection().toString().trim().length > 0) {
      showTooltip(e);
    } else {
      hideTooltip();
    }
  }
});
