//file for work branch
console.log('connect');
showNotes();
//if user adds a note add it to the localStorage
const addBtn = document.querySelector('#addBtn');
const dltBtn = document.querySelector('#delete');

//function to make
function makeNotes(e) {
    let addText = document.querySelector('#addText');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addText.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addText.value = '';
    // console.log(notesObj);
}

//function to show

function showNotes() {
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = '';
    notesObj.forEach(function(element, index) {
        html += `
        <div class=" notesClass card mx-2 my-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title" id='notesTitle'>NOTE ${index+1}</h5>
            <h6 class="card-subtitle mb-2 text-muted" id="notesContent">${element}</h6>

            <button id="${index}" onclick='deleteNote(this.id)' class="btn btn-danger my-2">DELETE NOTE</button>
        </div>
    </div>
        
        `

    });

    let notesElm = document.querySelector('#notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {

        notesElm.innerHTML = `<h2 class="No-notes">NO NOTES PLEASE ADD SOME</h2>`
    }

}

//function to delete note

function deleteNote(index) {
    //   console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}



addBtn.addEventListener('click', makeNotes);
addBtn.addEventListener('click', showNotes);
let search = document.getElementById('searchText');
search.addEventListener("input", function() {

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('notesClass');
    Array.from(noteCards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName("h6")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})