document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Ready")

    const input = document.querySelector("#text-input");
    const log = document.querySelector("#log");
    const modeSelect = document.querySelector("#mode-selector")
    const debouncedLog = debounce((text) => addToLog(text), 800)
    const throttledLog = throttle((text) => addToLog(text), 800)
    let mode = "debounce";
    document.querySelector("#mode-selector-debounce").checked = true;


    function debounce(fn, delay) {
        let debounceTimer;
        return function (...args) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => fn(...args), delay);
        }
    }

    function throttle(fn, delay) {
        let throttleTimer;
        let isActive = false;

        return function (...args) {
            if (isActive) return;

            fn(...args);
            isActive = true;
            throttleTimer = setTimeout(() => {
                isActive = false;
                clearTimeout(throttleTimer);
            }, delay)
        }
    }

    function addToLog(text) {
        if (!text) return;

        const timestamp = new Date().toLocaleString(navigator.language, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            fractionalSecondDigits: 3
        });
        const logText = `${timestamp} - ${mode} - ${text}`;
        const currLogText = log.textContent;
        log.textContent = (currLogText ? `${currLogText}\n` : "") + logText;
    }

    modeSelect.addEventListener("change", function (event) {
        const value = event.target.value;

        if (value === "mode-debounce") {
            mode = "debounce";
        } else if (value === "mode-throttle") {
            mode = "throttle";
        }
    })

    input.addEventListener("input", function (event) {
        const value = event.target.value;

        if (mode === "debounce") {
            debouncedLog(value);
        } else {
            throttledLog(value)
        }
    })

})