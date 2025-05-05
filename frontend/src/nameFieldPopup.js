import {createArrayWithNames} from "./getDatasForEntry.js";
import {getNewOne} from "./getDatasForPeople.js";

export async function nameField() {
    let existingNames = [];

    const response = await fetch(`http://localhost:3000/api/get-people`);
    const dataFromServer = await response.json();
    dataFromServer.forEach((item) => {
        existingNames.push(item.name)
    })

    const inputField = document.getElementById("nameInput");
    const suggestionsBox = document.getElementById("suggestions");
    let selectedIndex = -1;

    function showSuggestions(query) {
        suggestionsBox.innerHTML = "";
        selectedIndex = -1;
        const matches = query.length > 0
            ? existingNames.filter(name => name.toLowerCase().startsWith(query))
            : existingNames;

        if (matches.length > 0) {
            suggestionsBox.style.display = "block";
            const rect = inputField.getBoundingClientRect();
            suggestionsBox.style.left = `${rect.left}px`;
            suggestionsBox.style.top = `${rect.bottom + window.scrollY}px`;
            suggestionsBox.style.width = `${rect.width}px`;

            matches.forEach(name => {
                const div = document.createElement("div");
                div.classList.add("suggestion");
                div.textContent = name;
                div.addEventListener("click", () => {
                    selectName(name);
                });
                suggestionsBox.appendChild(div);
            });
        } else {
            suggestionsBox.style.display = "none";
        }
    }

    function selectName(name) {
        createArrayWithNames(name)
        existingNames = existingNames.filter(n => n !== name);
        inputField.value = "";
        suggestionsBox.style.display = "none";
    }

    function updateActiveSuggestion() {
        const items = suggestionsBox.getElementsByClassName("suggestion");
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove("active");
        }
        if (selectedIndex >= 0 && selectedIndex < items.length) {
            items[selectedIndex].classList.add("active");
            inputField.value = items[selectedIndex].textContent;
        }
    }

    inputField.addEventListener("input", function () {
        showSuggestions(inputField.value.toLowerCase());
    });

    inputField.addEventListener("focus", function () {
        showSuggestions(inputField.value.toLowerCase());
    });

    inputField.addEventListener("keydown", function (event) {
        const items = suggestionsBox.getElementsByClassName("suggestion");
        if (event.key === "ArrowDown") {
            selectedIndex = (selectedIndex + 1) % items.length;
            updateActiveSuggestion();
            event.preventDefault();
        } else if (event.key === "ArrowUp") {
            selectedIndex = (selectedIndex - 1 + items.length) % items.length;
            updateActiveSuggestion();
            event.preventDefault();
        } else if (event.key === "Enter" && selectedIndex >= 0) {
            selectName(items[selectedIndex].textContent);
            event.preventDefault();
        } else if (event.key === "Enter" && inputField.value.trim() !== "") {
            selectName(inputField.value.trim());
            event.preventDefault();
        }
    });

    document.addEventListener("click", function (event) {
        if (!inputField.contains(event.target) && !suggestionsBox.contains(event.target)) {
            suggestionsBox.style.display = "none";
        }
    });
}
