// ==UserScript==
// @name         Simple Popup Blocker
// @namespace    http://interlacedpixel.com/
// @updateURL    https://github.com/Jayian1890/userscripts/raw/main/simple-popup-block.js // Update this to your actual raw URL
// @downloadURL  https://github.com/Jayian1890/userscripts/raw/main/simple-popup-block.js // Update this too
// @version      0.6
// @description  Block requests to specific URLs, domains, and filenames.
// @author       You
// @match       *://*/*
// @grant        GM.webRequest
// @grant        GM.notification
// ==/UserScript==

(function () {
  "use strict";

  const blockedPatterns = [
    "https://phouckusogh.net/tag.min.js",
    "*://*/tag.min.js",
  ];

  const requestConfig = blockedPatterns.map((pattern) => {
    if (pattern.includes("*") && !pattern.startsWith("http")) {
      // Filename matching
      const regexPattern = pattern.replace(/\*/g, ".*");
      const regex = new RegExp(regexPattern);
      return {
        url: regex,
        action: "cancel",
        types: ["main_frame", "sub_frame"], // Block in main frames and iframes
      };
    } else {
      // URL/domain matching
      return {
        selector: pattern, // Use 'selector' for standard URL patterns
        action: "cancel",
        types: ["main_frame", "sub_frame"],
      };
    }
  });

  GM.webRequest(requestConfig, (details) => {
    console.log("Request blocked:", details.url, details.type);

    if (details.url) {
      GM.notification({
        text: `Blocked request to: ${details.url}`,
        title: "Request Blocked",
        timeout: 3000,
      });
    }
  });
})();
