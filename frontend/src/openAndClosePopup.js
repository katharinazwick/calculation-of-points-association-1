const addEntry = document.getElementById("newEntry");
addEntry.addEventListener("click", openPopupEntry);

const closeEntry = document.getElementById("closePopupEntry");
closeEntry.addEventListener("click", closePopupEntry);

export function openPopupEntry(char) {
    const popup = document.getElementById("popupEntry");
    document.getElementById("clothInput").style.display = "none";
    document.getElementById("clothSelection").style.display = "none";

    if (char === "Kauforder") {
        document.getElementById("clothSelection").style.display = "block";
    }
    if(char === "Kleidung hinzufügen"){
        document.getElementById("clothInput").style.display = "block";
    }
    popup.style.display = "block";
}

function closePopupEntry() {
    document.getElementById("popupEntry").style.display = "none";
}
