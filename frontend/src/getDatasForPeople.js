const newOneInput = document.getElementById("newOne");
const saveButton = document.getElementById("newOneButton");

newOneInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        saveButton.click();
    }
});

saveButton.addEventListener("click", function() {
    //document.getElementById("popupEntry").style.display = "none";
    getNewOne(newOneInput.value);
})

export async function getNewOne (name){
    const dataToServer = {name};
    try {
        const response = await fetch("http://localhost:3000/api/add-people", {
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
}