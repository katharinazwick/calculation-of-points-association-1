/*document.getElementById("saveInputPeople").addEventListener("click", async () => {
    const secondName = document.getElementById("secondName").value.trim();
    const firstName = document.getElementById("firstName").value.trim();
console.log("aa")
    if (!secondName || !firstName) {
        alert("Bitte Namen angeben");
        return;
    }

    const data = {secondName, firstName};
    console.log(data)
    try {
        const response = await fetch("http://localhost:4000/add-entry", {
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
});*/
