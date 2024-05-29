chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && (tab.url.includes("youtube.com/watch") || (tab.url.includes("youtube.com/embed"))) && changeInfo.status === 'complete') {
        const queryParameters = tab.url.split("?")[1];
        const urlParameters = new URLSearchParams(queryParameters);
        let videoId = urlParameters.get("v")
        if (!videoId && tab.url.includes("/embed/")) {
            videoId = tab.url.split("/embed/")[1];
        }

        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['contentScript.js']
        }, () => {
            chrome.tabs.sendMessage(tabId, {
                type: "NEW",
                videoId: videoId,
            });
        });
    }
});