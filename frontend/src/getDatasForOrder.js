const saveCloth = document.getElementById("saveInputOrder")
saveCloth.addEventListener("click", async function () {
    const date = document.getElementById("date").value;
    const name = document.getElementById("nameForOrder").value;
    console.log(name)
    const clothTyp = document.getElementById("clothSelection").value;
    const dataToServer = {date, name, clothTyp};
    console.log(dataToServer)
    try {
        const response = await fetch("http://localhost:3000/api/add-cloth/people", {
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