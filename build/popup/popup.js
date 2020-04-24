// interact.js requires messages.js
// if it gets more complicated, we'll need a way to manage dependencies...
browser.tabs.executeScript({file: "/scripts/messages/messages.js"});
browser.tabs.executeScript({file: "/scripts/messages/interact.js"});