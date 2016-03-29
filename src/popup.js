var fbUrl = "fb://";

function showResult(input) {
  document.querySelector('#input-area').innerHTML = input;
}

chrome.windows.getCurrent(function(w) {
  chrome.tabs.query({
      highlighted: true
    },
    function(r) {
      chrome.tabs.executeScript(r[0].id, {
        file: "dom.js"
      }, function() {
        console.log('injected dom.js!');
      });
    }
  );
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  var result = message.result;
  console.log(result);
  if (message.isSupportedFb) {
    if (message.isFbProfile) {
      result = fbUrl + 'profile/' + result;
    } else if (message.isFbPage) {
      result = fbUrl + 'page/' + result;
    }
    showResult(result);
    document.execCommand('selectAll');
    document.execCommand("copy");
  } else {
    showResult(result);
  }
});
