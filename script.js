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
addDemoDataToLibrary()

// rudimentary function, will change 
function addBookToLibrary() {
  let newBook = new Book(prompt("title"), prompt("collection"), prompt("author"), prompt("year"), prompt("status"))
  myLibrary.push(newBook)
  refreshLib()
}


// refresh interface so that what you see is the actual content of myLibrary
function refreshLib() {
  // alert("it works")  
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

    // Add delete button
    let deleteButtonContainer = document.createElement("div")
    let deleteButton = document.createElement("i")
    deleteButtonContainer.classList.add("book__delete");
    deleteButton.classList.add("ri-delete-bin-7-fill")
    bookContainer.appendChild(deleteButtonContainer)
    deleteButtonContainer.appendChild(deleteButton)

  });
  toggleReadUnread();
};

// get number of unique collections
// https://javascript.plainenglish.io/how-to-get-a-list-of-unique-values-from-a-javascript-array-of-objects-2e38f6cfd14
function getUniqueCollections(everyBook) {

  // use .map to retrieve the .collection property value of all the books in everyBook
  allCollections = everyBook.map(book => book.collection);

  // https://melvingeorge.me/blog/remove-empty-elements-from-array-javascript
  // numOfCol.filter((a) => a); // why doesn't this work?

  // remove the empty values
  const newArr = [];

  for (let i = 0; i < allCollections.length; i++) {
    if (allCollections[i]) {
      newArr.push(allCollections[i]);
    }
  }

  // remove duplicate by making it a Set
  let uniqueCollections = [...new Set(newArr)]

  return uniqueCollections;
}

// testing Button (on top left logo)
const testingButton = document.querySelector(".logo")
testingButton.addEventListener("click", () => {
  console.log("Testing button is working.")
});


// add books 
const btnAddBook = document.querySelector(".books__btn-add-book");
btnAddBook.addEventListener("click", addBookToLibrary);

// read/unread button on each book
function toggleReadUnread() {
  const readingStatus = document.querySelectorAll(".book__status")

  readingStatus.forEach((button) => {
    button.addEventListener("click", () => {

      let book = button.parentElement;
      let bookChildren = book.childNodes

      // target the book__status div
      let currentStatus = bookChildren[4].textContent;

      if (currentStatus === "read") {
        bookChildren[4].textContent = "unread"
        button.classList.remove("is-read");
        button.classList.add("is-unread");
      } else if (currentStatus === "unread") {
        bookChildren[4].textContent = "read"
        button.classList.remove("is-unread");
        button.classList.add("is-read");
      }

      // make sure the content of the button fits the data
      button.textContent = bookChildren[4].textContent;

    });
  });

  // delete button on each book
  const deleteButtons = document.querySelectorAll(".book__delete")
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {

      // remove data in array
      let book = button.parentElement;
      bookTitle = book.firstChild.textContent;

      myLibrary.forEach(item => {
        if (item.title === bookTitle) {
          myLibrary.splice(myLibrary.indexOf(item), 1)
          console.log(bookTitle + " has been removed from your library.")

        };
      });

      // remove visible element --  https://bobbyhadz.com/blog/javascript-remove-parent-element
      button.parentElement.remove();
    })
  });

};




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