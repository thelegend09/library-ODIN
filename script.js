// MAIN FUNCTIONS

let myLibrary = [];

function Book(title, collection, author, year, status) {
  this.title = title,
    this.collection = collection,
    this.author = author,
    this.year = year,
    this.status = status
}

// rudimentary
function addBookToLibrary() {
  let newBook = new Book(prompt("title"), prompt("collection"), prompt("author"), prompt("year"), prompt("status"))
  myLibrary.push(newBook)

}


/*
refresh lib function

- target the container of "book__container", "books__shelf"
- in "books__shelf", create a new div of a class "book__container"
- in the new "book__container", create a div with a class of "book__title"
- set the textContent of that div to book.title



*/

function refreshLib() {
  alert("it works")
  let booksShelf = document.querySelector(".books__shelf")

  myLibrary.forEach(book => {
    let bookContainer = document.createElement("div")
    bookContainer.classList.add("book__container")
    booksShelf.appendChild(bookContainer);

  })

}



// BUTTONS
// testing button
const testingButton = document.querySelector(".logo")
testingButton.addEventListener("click", () => refreshLib());


// add books 
const btnAddBook = document.querySelector(".books__btn-add-book");
btnAddBook.addEventListener("click", addBookToLibrary);

// add demo data
const btnAddDemoData = document.querySelector(".left-panel__btn-add-data")
btnAddDemoData.addEventListener("click", addDemoDataToLibrary)

// read/unread
const readingStatus = document.querySelectorAll(".book__status")
readingStatus.forEach((button) => {

  // this changes the appearance but not the "status" property in myLibrary
  button.addEventListener("click", function checkReadingStatus() {
    if (button.classList.contains("is-read")) {
      button.textContent = "Unread"
      button.classList.remove("is-read")
      button.classList.add("is-unread")
    } else if (button.classList.contains("is-unread")) {
      button.textContent = "Read"
      button.classList.remove("is-unread")
      button.classList.add("is-read")
    }
  });
});






function addDemoDataToLibrary() {
  addDemoBooks("Skyward", "Skyward", "Brandon Sanderson", 2018, "read")
  addDemoBooks("Steelheart", "Brandon Sanderson", "The Reckoners", 2013, "read")
  addDemoBooks("Firefight", "Brandon Sanderson", "The Reckoners", 2015, "read")
  addDemoBooks("A Deadly Education", "Naomi Novik", "The Scholomance", 2020, "read")
  addDemoBooks("Pride and Prejudice", "Jane Austen", "", 1813, "read")

  function addDemoBooks(title, collection, author, year, status) {
    let demoBook = new Book(title, collection, author, year, status)
    myLibrary.push(demoBook)
  }


}