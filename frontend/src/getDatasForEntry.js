const array = [{name:"anna", points:0}, {name:"sarah", points:"0"}];

const names = [];
const response = await fetch(`http://localhost:4000/get-people`);
const data = await response.json();
export function createArrayWithNames (name) {
names.push(name);
return names;
}

const saveButton = document.getElementById("saveInputEntry");
saveButton.addEventListener("click", async () => {
    const newName = [...new Set(names)];
    const date = document.getElementById("date").value;
    console.log(date)
    const person_id = 1;
    const data= {date, person_id}
    console.log(data)
    newName.forEach((item) => {
        array.forEach((key) => {
            if (key.name === item) key.points++;
        })
    })
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
    //datenbank person (name punktzahl erhöhen)
})






