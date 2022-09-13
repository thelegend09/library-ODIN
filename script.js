// MAIN FUNCTIONS

let myLibrary = [];

function Book(title, collection, author, year, status) {
  this.title = title,
    this.collection = collection,
    this.author = author,
    this.year = year,
    this.status = status
}

// initialize
refreshLib()

// rudimentary
function addBookToLibrary() {
  let newBook = new Book(prompt("title"), prompt("collection"), prompt("author"), prompt("year"), prompt("status"))
  myLibrary.push(newBook)

}


function refreshLib() {
  // alert("it works") ! 
  
  let booksShelf = document.querySelector(".books__shelf")

  myLibrary.forEach(book => {
    // create the container
    let bookContainer = document.createElement("div")
    bookContainer.classList.add("book__container")
    booksShelf.appendChild(bookContainer);

    // TODO: Create a function to streamline the following
    // createBookElements("book__title", "bookTitle")

    // function createBookElements(htmlClass, jsVar) {
    //   let jsVar = document.createElement("div")
    //   bookTitle.classList.add(htmlClass)
    //   bookContainer.appendChild(jsVar);
    // }

    // create the elements 
    let bookTitle = document.createElement("div")
    bookTitle.classList.add("book__title")
    bookContainer.appendChild(bookTitle);
    bookTitle.textContent = book.title;

    let bookAuthor = document.createElement("div")
    bookAuthor.classList.add("book__author")
    bookContainer.appendChild(bookAuthor);
    bookAuthor.textContent = book.author;

    let bookCollection = document.createElement("div")
    bookCollection.classList.add("book__collection")
    bookContainer.appendChild(bookCollection);
    bookCollection.textContent = book.collection;

    let bookYear = document.createElement("div")
    bookYear.classList.add("book__year")
    bookContainer.appendChild(bookYear);
    bookYear.textContent = book.year;

    let bookStatus = document.createElement("div")
    bookStatus.classList.add("book__status", "btn")
    bookContainer.appendChild(bookStatus);
    bookStatus.textContent = book.status;

    //  TODO: Use the nullish coalescing operator for this!
    // check book read/unread status
    if (book.status === "read") {
      bookStatus.classList.add("is-read")
    } else if (book.status === "unread") {
      bookStatus.classList.add("is-unread")
    }

  

  });
  refreshButtons()
};




// BUTTONS
// testing button
const testingButton = document.querySelector(".logo")
testingButton.addEventListener("click", () => refreshLib());


// add books 
const btnAddBook = document.querySelector(".books__btn-add-book");
btnAddBook.addEventListener("click", addBookToLibrary);


function refreshButtons() {
  // read/unread
  const readingStatus = document.querySelectorAll(".book__status")
  readingStatus.forEach((button) => {

    // ! this changes the appearance but not the "status" property in myLibrary
    // ! but I don't know how to change that yet
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
}




// add demo data
const btnAddDemoData = document.querySelector(".left-panel__btn-add-data")
btnAddDemoData.addEventListener("click", addDemoDataToLibrary)

function addDemoDataToLibrary() {
  addDemoBooks("Skyward", "Skyward", "Brandon Sanderson", 2018, "unread")
  addDemoBooks("Steelheart", "The Reckoners", "Brandon Sanderson", 2013, "read")
  addDemoBooks("Firefight", "The Reckoners", "Brandon Sanderson", 2015, "read")
  addDemoBooks("A Deadly Education", "The Scholomance", "Naomi Novik", 2020, "unread")
  addDemoBooks("Pride and Prejudice", "", "Jane Austen", 1813, "read")
  addDemoBooks("Great Expectations", "", "Charles Dickens", 1860, "read")
  addDemoBooks("Eldest", "The Inheritance Cycle", "Christopher Paolini", 2005, "unread")
  addDemoBooks("Brisingr", "The Inheritance Cycle", "Christopher Paolini", 2008, "read")

  function addDemoBooks(title, collection, author, year, status) {
    let demoBook = new Book(title, collection, author, year, status)
    myLibrary.push(demoBook)
  }

  refreshLib();
};