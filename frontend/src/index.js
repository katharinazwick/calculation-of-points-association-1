import {entryTable} from "./createEntryTable.js";
import {chronik} from "./createChronik.js";



const entry = [{date: "30.01.2001", people: "anna, lena"}, {date: "22.01.2002", people: "tom, lisa, anna"}]
entryTable(entry, "");

const entryButton = document.getElementById("changeToEntry");
const peopleButton = document.getElementById("changeToPeople");
const chronikButton = document.getElementById("changeToChronik");
const clothButton = document.getElementById("changeToCloth");

entryButton.addEventListener("click", function() {
    entryTable("");
    sidebar.style.display ="none";
})


peopleButton.addEventListener("click", function() {
    entryTable("Kauforder")
    sidebar.style.display ="none";
})



chronikButton.addEventListener("click", function() {
    chronik(data);
    sidebar.style.display ="none";
})

const value = [{cloth:"Tshirt", points: 5}]
clothButton.addEventListener("click", function() {
    entryTable("Kleidung hinzufügen")
    sidebar.style.display ="none";

})
