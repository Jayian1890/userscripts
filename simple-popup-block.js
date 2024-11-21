// ==UserScript==
// @name         Simple Popup Blocker
// @namespace    http://interlacedpixel.com/
// @updateURL    https://github.com/Jayian1890/userscripts/raw/main/simple-popup-block.js
// @downloadURL  https://github.com/Jayian1890/userscripts/raw/main/simple-popup-block.js
// @version      0.8
// @description  Blocks requests to specific URLs, domains, and filenames.
// @author       Jayian
// @match       *://*/*
// @grant        none // No other @grant directives needed
// ==/UserScript==

(function () {
  "use strict";

  const blockedURLs = [
    "https://peezowhat.net/tag.min.js",
    "*://*/tag.min.js",
    // Add more URLs here...
  ];

  function blockScripts(mutationList) {
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        for (const node of mutation.addedNodes) {
          if (node.nodeName === "SCRIPT" && node.src) {
            for (const blockedURL of blockedURLs) {
              if (node.src.includes(blockedURL)) {
                node.remove();
                console.log("Blocked script injection:", node.src);
                break; // Stop checking other blocked URLs once a match is found
              }
            }
          }
        }
      }
    }
  }

  const observer = new MutationObserver(blockScripts);
  observer.observe(document.head, { childList: true, subtree: true });
})();
