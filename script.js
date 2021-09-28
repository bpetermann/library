let myLibrary = [
  "Lord of the Rings by J.R.R Tolkien, 1137 pages, not read yet",
  "Dune by Frank Herbert, 412 pages, finished reading",
];
let booklist = document.getElementById("booklist");
let form = document.getElementById('newbook');
const clear = document.getElementById("clear");
let finished = 0;
let unfinished = 5;
let finishedDisplay = document.getElementById("finished");
let unfinishedDisplay = document.getElementById("unfinished");


function Book(title, author, pages, read) {
  this.title = title;
  this.author = author
  this.pages = pages
  this.read = read

  Book.prototype.infos = function () {
    if (document.querySelector('input[type=checkbox]').checked) {
      finished++;
      return ` ${this.title} by ${this.author}, ${this.pages} pages, finished reading`
    }
    else {
      unfinished++;
      return ` ${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
    }
  }
}

const addBook = (e) => {
  e.preventDefault();

  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let read = document.getElementById('read').value;

  let book = new Book(title, author, pages, read);
  let tr = document.createElement("tr");

  myLibrary.push(book.infos());
  tr.innerText = myLibrary[myLibrary.length - 1];

  booklist.appendChild(tr);

  addChanceDelete();
  updateDisplay()
  document.getElementById("newbook").reset();
}


//Remove Button
function remove() {
  let lastLetter = this.previousElementSibling;
  if (lastLetter.textContent.slice(-1) != "g") { unfinished--; updateDisplay(); }
  else { finished--; updateDisplay(); }
  booklist.removeChild(this.previousElementSibling);
  booklist.removeChild(this.nextElementSibling);
  booklist.removeChild(this);
  updateDisplay();
}


//Chance Status Button
function chanceStatus() {
  let lastLetter = this.previousElementSibling.previousElementSibling;
  if (lastLetter.textContent.slice(-1) != "g") {
    finished++; unfinished--;

    updateDisplay();
    let alreadyRead = " finished reading";
    lastLetter.textContent = lastLetter.textContent.slice(0, -12).concat(alreadyRead);
  }
  else {
    finished--; unfinished++;
    updateDisplay();
    let notYet = " not read yet"
    lastLetter.textContent = lastLetter.textContent.slice(0, -17).concat(notYet);
  }
}


//Clear after AddBook
clear.addEventListener("click", () => {
  document.getElementById("newbook").reset();
});


//Add "Chance Status" and "Delete" Buttons
function addChanceDelete() {
  let removeBtn = document.createElement('button');
  removeBtn.setAttribute('id', 'delete');
  let chanceBtn = document.createElement('button');
  chanceBtn.setAttribute('id', 'chance');

  // chanceBtn.innerHTML = "Chance"
  // removeBtn.innerHTML = "Delete";

  removeBtn.onclick = remove;
  chanceBtn.onclick = chanceStatus;

  booklist.appendChild(removeBtn);
  booklist.appendChild(chanceBtn);
}


function updateDisplay() {
  if (finished < 0) { finished = 0; }
  else if (unfinished < 0) { unfinished = 0; }
  finishedDisplay.innerHTML = `Books read: ${finished}`;
  unfinishedDisplay.innerHTML = `Books unread: ${unfinished}`;

};


myLibrary.forEach((item) => {
  let tr = document.createElement("tr");
  tr.innerText = item;
  booklist.appendChild(tr);
  addChanceDelete();
})
updateDisplay()

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("newbook").addEventListener('submit', addBook);
});


