let myLibrary = [];

function Book(title, collection, author, year, status) {
  this.title = title,
    this.collection = collection,
    this.author = author,
    this.year = year,
    this.status = status
}

function addBookToLibrary() {
  let newBook = new Book(prompt("title"), prompt("collection"), prompt("author"), prompt("year"), prompt("status"))
  myLibrary.push(newBook)
}


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
// let sandSteelheart = Book("Steelheart", "Brandon Sanderson", "The Reckoners", 2013, "read")
// let sandFirefight = Book("Firefight", "Brandon Sanderson", "The Reckoners", 2015, "read")

// myLibrary.push(sandSteelheart, sandFirefight)

// add books button
const btnAddBook = document.querySelector(".books__btn-add-book");
btnAddBook.addEventListener("click", addBookToLibrary);


// add demo data
const btnAddDemoData = document.querySelector(".left-panel__btn-add-data")
btnAddDemoData.addEventListener("click", addDemoDataToLibrary)