document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Ready");

    const OPTIONS = [
        { label: 'option 1', disabled: false },
        { label: 'option 2', disabled: false },
        { label: 'option 3', disabled: true },
        { label: 'option 4', disabled: false },
    ]

    function populateOptions() {
        OPTIONS.forEach(opt => {
            const option = document.createElement("li");
            option.textContent = opt.label;
            option.setAttribute("role", "option");
            option.setAttribute("tabIndex", "0");
            option.classList.add("dropdown-option");
            if (opt.disabled) {
                option.setAttribute("aria-disabled", true);
                option.classList.add("disabled")
            }
            dropdownBody.appendChild(option);
        })
    }

    function handleOpenDropdown() {
        isDropdownExpanded = true;
        dropdownTrigger.setAttribute("aria-expanded", true);
        dropdownBody.classList.add("expanded");
        dropdownBody.focus();
    }

    function handleCloseDropdown() {
        isDropdownExpanded = false;
        dropdownTrigger.setAttribute("aria-expanded", false);
        dropdownBody.classList.remove("expanded");
        dropdownBody.blur();
    }

    function handleOptionSelect(option) {
        if (option.classList.contains("disabled")) return;

        if (selectedOption) {
            selectedOption.classList.remove("selected");
            selectedOption.setAttribute("aria-selected", false);
        }

        option.classList.add("selected");
        option.setAttribute("aria-selected", true);
        selectedOption = option;
        dropdownTrigger.value = option.textContent;
        handleCloseDropdown()
    }

    const dropdownWrapper = document.querySelector("#dropdown-wrapper");
    const dropdownTrigger = document.querySelector('#dropdown-trigger');
    const dropdownBody = document.querySelector("#dropdown-body");
    let selectedOption = undefined;
    let isDropdownExpanded = false;
    dropdownTrigger.value = ""

    populateOptions();

    dropdownTrigger.addEventListener("click", function () {
        if (isDropdownExpanded) {
            handleCloseDropdown();
        } else {
            handleOpenDropdown();
        }
    })
    dropdownTrigger.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            if (isDropdownExpanded) {
                handleCloseDropdown();
            } else {
                handleOpenDropdown();
            }
        }
    })

    document.addEventListener("click", function (event) {
        if (!dropdownWrapper.contains(event.target) && isDropdownExpanded) {
            handleCloseDropdown()
        }
    })
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && isDropdownExpanded) {
            handleCloseDropdown();
        }
    })

    dropdownBody.addEventListener("click", function (event) {
        const selected = event.target;
        handleOptionSelect(selected);
    })
    dropdownBody.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            const selected = event.target;
            handleOptionSelect(selected);
        }
    })
});