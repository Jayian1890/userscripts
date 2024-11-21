// ==UserScript==
// @name         Simple Popup Blocker
// @namespace    http://interlacedpixel.com/
// @updateURL    https://github.com/Jayian1890/userscripts/raw/main/simple-popup-block.js
// @downloadURL  https://github.com/Jayian1890/userscripts/raw/main/simple-popup-block.js
// @version      0.7
// @description  Blocks requests to specific URLs, domains, and filenames.
// @author       Jayian
// @match       *://*/*
// @grant        none // No other @grant directives needed
// ==/UserScript==

(function () {
  "use strict";

  // Manually inject the GM API (if available)
  if (typeof unsafeWindow !== "undefined" && unsafeWindow.GM) {
    var GM = unsafeWindow.GM; // Get GM from page context

    const blockedPatterns = [
      "*://*/tag.min.js",
      // other patterns
    ];

    const requestConfig = blockedPatterns.map((pattern) => {
      if (pattern.includes("*") && !pattern.startsWith("http")) {
        const regexPattern = pattern.replace(/\*/g, ".*");
        const regex = new RegExp(regexPattern);
        return {
          url: regex,
          action: "cancel",
          types: ["main_frame", "sub_frame"],
        };
      } else {
        return {
          selector: pattern,
          action: "cancel",
          types: ["main_frame", "sub_frame"],
        };
      }
    });

    GM.webRequest(requestConfig, (details) => {
      console.log("Request blocked:", details.url, details.type);
      if (details.url && GM.notification) {
        // Check if GM.notification exists
        GM.notification({
          text: `Blocked request to: ${details.url}`,
          title: "Request Blocked",
          timeout: 3000,
        });
      }
    });
  } else {
    console.error("Userscripts GM API not found. Script will not function.");
  }
})();
