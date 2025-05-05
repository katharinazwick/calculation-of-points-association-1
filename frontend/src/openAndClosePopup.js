import {clothSelect, peopleSelect} from "./createClothSelect.js";

const closeEntry = document.getElementById("closePopupEntry");
closeEntry.addEventListener("click", closePopupEntry);

export function openPopupEntry(char) {
    const popup = document.getElementById("popupEntry");
    document.getElementById("clothInput").style.display = "none";
    document.getElementById("clothSelection").style.display = "none";
   document.getElementById("saveInputCloth").style.display = "none";
   document.getElementById("saveInputOrder").style.display = "none";
    document.getElementById("nameInput").style.display="block";
    document.getElementById("date").style.display="block";
    document.getElementById("saveInputEntry").style.display="block";
    document.getElementById("nameForOrder").style.display = "none";
    if (char === "Kauforder") {
        document.getElementById("saveInputEntry").style.display = "none";
        document.getElementById("clothSelection").style.display = "block";
        document.getElementById("saveInputOrder").style.display = "block";
        document.getElementById("nameInput").style.display="none";
        document.getElementById("nameForOrder").style.display = "block";
        peopleSelect();
        clothSelect();
    }else if(char === "Kleidung hinzufügen"){
        document.getElementById("clothInput").style.display = "block";
        document.getElementById("nameInput").style.display="none";
        document.getElementById("date").style.display="none";
        document.getElementById("saveInputEntry").style.display = "none";
        document.getElementById("saveInputCloth").style.display="block";
    }
    popup.style.display = "block";
}

function closePopupEntry() {
    document.getElementById("popupEntry").style.display = "none";
}
