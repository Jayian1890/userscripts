// ==UserScript==
// @name         Simple Popup Blocker
// @namespace    http://interlacedpixel.com/
// @version      0.1
// @description  Block GET requests to specific URLs, domains, and filenames.
// @author       me
// @match       *://*/*
// @grant        GM.webRequest
// ==/UserScript==

(function () {
  "use strict";

  const blockedPatterns = [
    "https://phouckusogh.net/tag.min.js",
    //"https://*.example.com/*",
    //"https://another-site.net/*",
    //"https://yet-another-site.org/specific-path/*",
    //"http://*.bad-domain.com/annoying-popup.js",
    //"*://*/*.annoying.js", // Blocks any URL ending with /annoying.js
    //"*://*/tag.min.js", // Blocks bad-script.js on any domain
    //"*tag.min.js", // Blocks any URL containing example-file.gif (less common, but can be useful)
  ];

  const requestConfig = blockedPatterns.map((pattern) => {
    // Use a regular expression for filename matching:
    if (pattern.includes("*") && !pattern.startsWith("http")) {
      // Filename matching logic

      const regexPattern = pattern.replace(/\*/g, ".*"); // Replace * with .* for regex
      const regex = new RegExp(regexPattern);

      return {
        url: regex, // Use 'url' instead of 'selector' with regexes
        action: "cancel",
        types: ["main_frame", "sub_frame"], // Include sub_frames for popups in iframes. Adjust as needed
      };
    } else {
      // Standard URL/domain matching

      return {
        selector: pattern,
        action: "cancel",
        types: ["main_frame", "sub_frame"], // Important: Block in sub-frames as well for complete protection.
      };
    }
  });

  GM_webRequest(requestConfig, (info, message, details) => {
    console.log("Request blocked:", info.url, info.type);

    if (info.url) {
      GM_notification({
        text: `Blocked request to: ${info.url}`,
        title: "Request Blocked",
        timeout: 3000,
      });
    }
  });
})();
