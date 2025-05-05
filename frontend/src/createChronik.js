import {peopleSelect} from "./createClothSelect.js";
import {addDoubleClickEvent} from "./upgrateAndDelete.js";

export async function chronik() {
    const container = document.getElementById("container");
    container.innerHTML = "";
    const select = document.getElementById("nameForOrder");
    console.log(select)
    const option = document.createElement("option");
    option.textContent = "Person";
    select.appendChild(option);
    peopleSelect();
    container.appendChild(select);

    const filterSelect = document.createElement("select");
    const optionArray = ["Filter", "Wachdienst", "Kauforder"];
    optionArray.forEach((option) => {
        const filterOption  = document.createElement("option");
        filterOption.textContent = option;
        filterOption.value = option;
        filterSelect.appendChild(filterOption);
    })
    container.appendChild(filterSelect);

    const arr = ["Datum", "Aktion", "Betrag","Punktzahl"]

    const header = document.createElement("div");
    header.className = "table";

    for (let key of arr) {
        const column = document.createElement("div");
        column.className = "column";
        column.style.width = "25%"
        Object.assign(column.style,
            {
                justifyContent: "center",
                alignItems: "center",
            })
        column.innerText = key;
        header.appendChild(column);
    }
    container.appendChild(header);

    const table = document.createElement("div");
    table.className = "tableContainer";

select.addEventListener("change", async () => {
        table.innerHTML = "";

    const response = await fetch(`http://localhost:3000/api/add-entry/cloth/${select.value}`);
           const dataFromServer = await response.json();

        let score = 0;
        dataFromServer.forEach(item => {
            score += item.amount
            const row = document.createElement("div");
            row.className = "table";
            for (let key in item) {
                const column = document.createElement("div");
                column.className = "tableColumn";
                if (key === "amount") {
                    item.score = score;
                }
                column.innerText = item[key];
                column.style.width = "25%"
                Object.assign(column.style,
                    {
                        justifyContent: "center",
                        alignItems: "center",
                        color: "black",
                    })
                row.appendChild(column);
            }
            table.appendChild(row);
        })
        container.appendChild(table);
    setTimeout(addDoubleClickEvent ("get-entry/cloth"), 100);

    })

}

/*filterSelect.addEventListener("change", async (e) => {
    const response = await fetch(`http://localhost:3000/api/add-${filterSelect.value}/select.value}`);
    const dataFromServer = await response.json();
    console.log(filterSelect.value);
})*/