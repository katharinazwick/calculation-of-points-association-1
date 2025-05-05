import {entryTable} from "./createEntryTable.js";
import {chronik} from "./createChronik.js";

entryTable( "Wachdienst hinzufügen");
//chronik();
const entryButton = document.getElementById("changeToEntry");
const peopleButton = document.getElementById("changeToPeople");
const chronikButton = document.getElementById("changeToChronik");
const clothButton = document.getElementById("changeToCloth");

entryButton.addEventListener("click", function() {
    entryTable("Wachdienst hinzufügen");
    sidebar.style.display ="none";
})


peopleButton.addEventListener("click", function() {
    entryTable( "Kauforder")
    sidebar.style.display ="none";
})



chronikButton.addEventListener("click", function() {
    chronik();
    sidebar.style.display ="none";
})

clothButton.addEventListener("click", function() {
    entryTable( "Kleidung hinzufügen")
    sidebar.style.display ="none";

})
