const newOneInput = document.getElementById("newOne");
const saveButton = document.getElementById("newOneButton");

newOneInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        saveButton.click();
    }
});

saveButton.addEventListener("click", function() {
    getNewOne(newOneInput.value);
})

export async function getNewOne (name){
    const point = 0;
    const data = {name, point};
    try {
        const response = await fetch("http://localhost:4000/add-people", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error("Fehler:", error);
        alert("Server nicht erreichbar!");
    }
}