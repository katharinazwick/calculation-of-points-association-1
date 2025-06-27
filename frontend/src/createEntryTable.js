import {openPopupEntry} from "./openAndClosePopup.js";
import {nameField} from "./nameFieldPopup.js";

export async function entryTable( char) {
    const container = document.getElementById("container");
    container.innerHTML = "";

    const button = document.createElement("button");
    button.innerText = char;
    button.style.marginBottom = "10px"
    container.appendChild(button);
    button.addEventListener("click", async () => {
        openPopupEntry(char);
        nameField();
    })

    const object = {
        "Wachdienst hinzufügen" : "get-entry/people",
        "Kauforder" :"get-people",
        "Kleidung hinzufügen": "get-cloth"
    }
    let dataFromServer;
let temp;
    for(let key in object) {
        if(char === key) {
            temp = object[key];
            const response = await fetch(`http://localhost:3000/api/${temp}`);
            dataFromServer = await response.json();
            break;
        }
    }

    const header = document.createElement("div");
    header.className = "table";

    for (let key in dataFromServer[0]) {
        const column = document.createElement("div");
        column.className = "column";
        column.style.width = "50%"
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

    dataFromServer.forEach(item => {
        const row = document.createElement("div");
        row.className = "table";
        for (let key in item) {
            const column = document.createElement("div");
            column.className = "tableColumn";
            column.innerText = item[key];
            //column.style.width = key === "people" ? "70%" : "50%"
            column.style.width = "50%"
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

    container.append(table);
}

