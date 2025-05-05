const saveCloth = document.getElementById("saveInputCloth")
saveCloth.addEventListener("click", async function () {
    const date = document.getElementById("date").value;
    const clothTyp = document.getElementById("clothTypInput").value;
    const amount = document.getElementById("clothPointInput").value;
    if(amount > 0){
        alert("maximaler Punktewert beträgt 0");
    }
    const dataToServer = {date, clothTyp, score: amount};
    try {
        const response = await fetch("http://localhost:3000/api/add-cloth", {
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

