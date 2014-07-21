(function() {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
    tab = tabs[0];
    var iframe = document.createElement('iframe');
    iframe.src =
      "http://www.channelkit.com/bookmarklet/server?origin=" +
      encodeURIComponent(tab.url);
    document.body.appendChild(iframe);
  });
  window.addEventListener("message", function(e) {
    if (e.origin !== "http://www.channelkit.com") {
      return;
    }
    var message = e.data;
    if (message === "close") {
      window.close();
    }
    if (message.hasOwnProperty("status") && message.status === "saved") {
      window.close();
    }
  }, false);
})();
