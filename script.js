let myLibrary = [];

function Book(title, collection, author, year, status) {
  this.title = title,
  this.collection = collection,
  this.author = author,
  this.year = year,
  this.status = status
}

function addBookToLibrary() {
  // do stuff here
}

let sandSteelheart = Book("Steelheart", "Brandon Sanderson", "The Reckoners", 2013, "read")
let sandFirefight = Book("Firefight", "Brandon Sanderson", "The Reckoners", 2015, "read")

myLibrary.push(sandSteelheart, sandFirefight)

console.log(myLibrary)