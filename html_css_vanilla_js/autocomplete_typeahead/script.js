document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Ready")

    const SUGGESTIONS = [
        "apple", "apply", "application", "applause", "appliance",
        "cat", "category", "catalogue", "caterpillar", "catapult",
        "dog", "dogfish", "dogged", "dogma", "dogwood",
        "hand", "handle", "handbook", "handsome", "handshake",
        "light", "lightning", "lighthouse", "lightweight", "lighting",
        "play", "player", "playground", "playful", "playback",
        "sun", "sunny", "sunflower", "sunrise", "sunset",
        "work", "worker", "workshop", "workplace", "workout"
    ];


    const autoCompleteWrapper = document.querySelector("#autocomplete-wrapper");
    const queryInput = document.querySelector("#query-input");
    const suggestionsContainer = document.querySelector('#suggestions-container');
    let debounceTimer;
    let activeIndex = -1;
    let suggestionList = []

    function fetchMatches(queryStr) {
        const matches = SUGGESTIONS.filter(str => str.toLowerCase().includes(queryStr));
        return matches;
    }

    function selectSuggestion() {
        const suggestions = suggestionsContainer.querySelectorAll(".suggestion")
        queryInput.value = suggestionList[activeIndex];
        suggestionsContainer.innerHTML = "";
        activeIndex = -1;
    }

    document.addEventListener("click", function (event) {
        if (!autoCompleteWrapper.contains(event.target)) {
            suggestionsContainer.innerHTML = "";
        }
    })
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && suggestionList.length > 0) {
            suggestionsContainer.innerHTML = "";
        }
    })

    queryInput.addEventListener("input", function (event) {
        suggestionsContainer.innerHTML = "";
        let queryStr = event.target.value ?? "";
        if (!queryStr) return;

        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        debounceTimer = setTimeout(() => {
            queryStr = queryStr.toLowerCase();
            const matches = fetchMatches(queryStr);
            queryInput.setAttribute("aria-expanded", matches.length > 0)

            if (matches && matches.length > 0) {
                suggestionList = matches;
                matches.forEach(suggestion => {
                    const suggestionItem = document.createElement("p");
                    suggestionItem.textContent = suggestion;
                    suggestionItem.classList.add("suggestion")
                    suggestionItem.setAttribute("role", "option");
                    suggestionItem.setAttribute("tabIndex", "0");
                    suggestionItem.setAttribute("aria-selected", false);
                    suggestionsContainer.appendChild(suggestionItem);
                })
            }
        }, 500)
    })

    suggestionsContainer.addEventListener("click", function () {
        selectSuggestion();
    })

    suggestionsContainer.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            selectSuggestion()
        }
        if (event.key === "ArrowDown") {
            event.preventDefault()
            const newIndex = Math.min(activeIndex + 1, suggestionList.length - 1);
            updateSuggestionUI(newIndex);
        }
        if (event.key === "ArrowUp") {
            event.preventDefault()
            const newIndex = Math.max(activeIndex - 1, -1);
            updateSuggestionUI(newIndex);
        }

        function updateSuggestionUI(newIndex) {
            const suggestions = suggestionsContainer.querySelectorAll(".suggestion")
            if (suggestions.length === 0)
                return;

            if (activeIndex > -1) {
                suggestions[activeIndex].blur()
                suggestions[activeIndex].setAttribute("aria-selected", false);
            }

            activeIndex = newIndex;
            if (newIndex === -1)
                return;
            suggestions[newIndex].focus();
            suggestions[newIndex].setAttribute("aria-selected", true);
        }
    })
})