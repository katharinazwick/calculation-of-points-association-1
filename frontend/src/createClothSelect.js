export async function peopleSelect (){
    const response = await fetch(`http://localhost:3000/api/get-people`);
    const dataFromServer = await response.json();
    const select = document.getElementById("nameForOrder")
    dataFromServer.forEach(item => {
        const option = document.createElement('option');
        option.value = item.name;
        option.textContent = item.name;
        select.appendChild(option);
    });
}

export async function clothSelect() {
    const responseCloth = await fetch(`http://localhost:3000/api/get-cloth`);
    const dataFromServerCloth = await responseCloth.json();
    const selectCloth = document.getElementById("clothSelection")
    dataFromServerCloth.forEach(item => {
        const option = document.createElement('option');
        option.value = item.clothtyp;
        option.textContent = item.clothtyp;
        selectCloth.appendChild(option);
    });
}