import {openPopupEntry} from "./openAndClosePopup.js";

export async function entryTable(char) {
    const container = document.getElementById("container");
    container.innerHTML = "";

    const response = await fetch(`http://localhost:4000/get-people`);
    const data = await response.json();

    if (char !== ""){
        const buying = document.createElement("button");
        buying.innerText =char;
        buying.style.marginBottom= "10px"
        container.appendChild(buying);
        buying.addEventListener("click", async () => {
            openPopupEntry(char);
        })
    }

    const header = document.createElement("div");
    header.className = "table";

    for (let key in data[0]) {
        if(key ==="id") continue;
        const column = document.createElement("div");
        column.className = "column";
        column.style.width = key === "people" ? "70%" : "50%"
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

    data.forEach(item => {
        const row = document.createElement("div");
        row.className = "table";
        for (let key in item) {
            if(key ==="id") continue;
            const column = document.createElement("div");
            column.className = "tableColumn";
            column.innerText = item[key];
            column.style.width = key === "people" ? "70%":"50%"
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
