(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    const currentUrl =  new URL(window.location.href);

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();
        }
    });

    const newVideoLoaded = () => {
        if (currentUrl.href.includes("watch")) {
            const popupBtn = document.createElement("img");
            popupBtn.src = chrome.runtime.getURL("assets/popup.svg");
            popupBtn.className = "ytp-button popup-btn";
            popupBtn.title = "Popup your video";

            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];

            youtubeLeftControls.appendChild(popupBtn);
            popupBtn.addEventListener("click", onExtensionButtonClickEventHandler);
        } else {
            const popoutBtn = document.createElement("img");
            popoutBtn.src = chrome.runtime.getURL("assets/popout.svg");
            popoutBtn.className = "ytp-button popout-btn";
            popoutBtn.title = "Popout your video";

            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];

            youtubeLeftControls.appendChild(popoutBtn);
            popoutBtn.addEventListener("click", onExtensionButtonClickEventHandler);
        }
    };

    const onExtensionButtonClickEventHandler = () => {
        currentUrl.href.includes("watch") ?
            currentUrl.href = currentUrl.href.replace(/\/watch\?v=/, "/embed/") + "?autoplay=1"
            :
            currentUrl.href = currentUrl.href.replace("/embed/", "/watch?v=")
         window.location.href = currentUrl.toString();
    };

    newVideoLoaded();
})();