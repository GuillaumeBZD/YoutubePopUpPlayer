(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    const currentUrl = new URL(window.location.href);

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const {type, value, videoId} = obj;

        if (type === "NEW") {
            currentVideo = videoId;
            addButtonOnVideo();
        }
    });

    const addButtonOnVideo = () => {
        removeExistingButtons()
        let buttonToDisplay;
        if (currentUrl.href.includes("watch")) {
            const popupBtn = document.createElement("img");
            buttonToDisplay = popupBtn
            popupBtn.src = chrome.runtime.getURL("assets/popup.svg");
            popupBtn.className = "ytp-button popup-btn";
            popupBtn.title = "Popup your video";
        } else {
            const popoutBtn = document.createElement("img");
            buttonToDisplay = popoutBtn
            popoutBtn.src = chrome.runtime.getURL("assets/popout.svg");
            popoutBtn.className = "ytp-button popout-btn";
            popoutBtn.title = "Popout your video";
        }
        youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
        youtubePlayer = document.getElementsByClassName("video-stream")[0];
        youtubeLeftControls.appendChild(buttonToDisplay);
        buttonToDisplay.addEventListener("click", onExtensionButtonClickEventHandler);
    };

    const removeExistingButtons = () => {
        const existingPopupBtn = document.querySelector(".popupBtn")
        const existingPopoutBtn = document.querySelector(".popoutBtn")
        if (existingPopupBtn) existingPopupBtn.remove();
        if (existingPopoutBtn) existingPopoutBtn.remove();
    }

    const onExtensionButtonClickEventHandler = () => {
        currentUrl.href.includes("watch") ?
            currentUrl.href = currentUrl.href.replace(/\/watch\?v=/, "/embed/") + "?autoplay=1"
            :
            currentUrl.href = currentUrl.href.replace("/embed/", "/watch?v=").replace("?autoplay=1", "")
        window.location.href = currentUrl.toString();
    };

    addButtonOnVideo();
})();