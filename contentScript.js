(() => {
    let youtubeRightControls, youtubePlayer;
    let currentVideo = "";
    let currentUrl = new URL(window.location.href);

    chrome.runtime.onMessage.addListener((obj) => {
        const {type, videoId} = obj;
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
            popupBtn.style.marginRight = "10px"
            popupBtn.style.minWidth = "30px"
            popupBtn.title = "Popup your video";
        } else {
            const popoutBtn = document.createElement("img");
            buttonToDisplay = popoutBtn
            popoutBtn.src = chrome.runtime.getURL("assets/popout.svg");
            popoutBtn.className = "ytp-button popout-btn";
            popoutBtn.style.marginRight = "10px"
            popoutBtn.style.minWidth = "30px"
            popoutBtn.title = "Popout your video";
        }
        youtubeRightControls = document.getElementsByClassName("ytp-right-controls")[0];
        youtubePlayer = document.getElementsByClassName("video-stream")[0];
        youtubeRightControls.insertBefore(buttonToDisplay, youtubeRightControls.children[0]);
        buttonToDisplay.addEventListener("click", onExtensionButtonClickEventHandler);
    };

    const removeExistingButtons = () => {
        const existingPopupBtn = document.querySelector(".popup-btn")
        const existingPopoutBtn = document.querySelector(".popout-btn")
        if (existingPopupBtn) existingPopupBtn.remove();
        if (existingPopoutBtn) existingPopoutBtn.remove();
    }

    const onExtensionButtonClickEventHandler = () => {
        let newUrl;
        if (currentUrl.href.includes("watch")) {
            newUrl = `https://www.youtube.com/embed/${currentVideo}?autoplay=1`;
        } else if (currentUrl.href.includes("embed")) {
            newUrl = `https://www.youtube.com/watch?v=${currentVideo}`;
        }
        window.location.href = newUrl;
    };

    addButtonOnVideo();
})();