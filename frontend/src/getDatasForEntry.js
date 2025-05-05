const names = [];
const response = await fetch(`http://localhost:3000/api/get-people`);
const dataFromServer = await response.json();

export function createArrayWithNames(name) {
    names.push(name);
    return names;
}

const saveButton = document.getElementById("saveInputEntry");
saveButton.addEventListener("click", async () => {
    console.log("hallo")
    const newName = [...new Set(names)];
    const date = document.getElementById("date").value;
    const dataToServer = {date, newName}
    try {
        const response = await fetch("http://localhost:3000/api/add-entry", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToServer)
        });
    } catch (error) {
        console.error("Fehler:", error);
        alert("Server nicht erreichbar!");
    }

    document.getElementById("popupEntry").style.display = "none";

})






