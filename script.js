// MAIN 
let myLibrary = [];

function Book(title, collection, author, year, status) {
  this.title = title,
    this.collection = collection,
    this.author = author,
    this.year = year,
    this.status = status
}

// initialize
addDemoDataToLibrary();


// refresh interface so that what you see is the actual content of myLibrary
function refreshLib() {
  // alert("it works")  
  let booksShelf = document.querySelector(".books__shelf")
  // start afresh everytime
  removeAllChildNodes(booksShelf);

  myLibrary.forEach(book => {
    // create the container
    let bookContainer = document.createElement("div")
    bookContainer.classList.add("book__container")
    booksShelf.appendChild(bookContainer);

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

    // check book read/unread status
    if (book.status == "read") {
      bookStatus.classList.add("is-read")
    } else if (book.status == "unread") {
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


// button: testing button (on top left logo)
const testingButton = document.querySelector(".logo")
testingButton.addEventListener("click", () => {
  console.log("Testing button is working.")

myNotif("Booklist has been updated", "", "success")


});








// button: toggle read/unread on each book
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

      // console.log(bookChildren[0].textContent + " has been marked " + bookChildren[4].textContent.toUpperCase() + ".")
      myNotif(bookChildren[0].textContent, "has been marked " + bookChildren[4].textContent.toUpperCase() + ".", "info")

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
          myNotif(bookTitle, "has been removed from your library.", "error")

        };
      });

      // remove visible element --  https://bobbyhadz.com/blog/javascript-remove-parent-element
      button.parentElement.remove();
    })
  });

};






// MODAL

// button: add books 
const openModalButton = document.querySelector(".books__btn-add-book");
const closeModalButton = document.getElementById("cancel")
const overlay = document.getElementById("overlay")
const modal = document.querySelector(".form-container")
const form = document.querySelector(".form")
const submitButton = document.querySelector("#submit")



openModalButton.addEventListener("click", () => openModal(modal));
closeModalButton.addEventListener("click", () => closeModal(modal));

submitButton.addEventListener("click", () => {

  let title = document.querySelector("#title")
  let collection = document.querySelector("#collection")
  let author = document.querySelector("#author")
  let year = document.querySelector("#year")
  let status = document.querySelector("input[type='radio']:checked").value;

  let newBook = [];

  // let newBook = new Book(title.value, collection.value, author.value, year.value, readingStatus.value)
  newBook = new Book(title.value, collection.value, author.value, year.value, status)

  myLibrary.unshift(newBook)
  refreshLib();
  myNotif("Awesome!", newBook.title + " has been added to your library.", "success")
  // console.log(newBook.title + " has been added to your library.")
  closeModal(modal)
});

function openModal(modal) {
  if (modal == null) return
  modal.classList.add("active")
  overlay.classList.add("active")

}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove("active")
  overlay.classList.remove("active")

  // reset fields
  document.querySelector("#title").value = ""
  document.querySelector("#collection").value = ""
  document.querySelector("#author").value = ""
  document.querySelector("#year").value = ""

  // reset radio buttons
  const readingStatus = document.getElementsByName("status");
  for (let i = 0; i < readingStatus.length; i++) {
    if (readingStatus[i].type == "radio") {
      readingStatus[i].checked = false;
    }
  }

}

// 2.3 add demo data
const btnAddDemoData = document.querySelector(".left-panel__btn-add-data")
btnAddDemoData.addEventListener("click", addDemoDataToLibrary)

function addDemoDataToLibrary() {
  console.log("Demo data has been added.")
  myNotif("Demo data successfully added", "from my favorite books.", "success")
  addDemoBooks("Skyward", "Skyward", "Brandon Sanderson", 2018, "unread")
  addDemoBooks("Steelheart", "The Reckoners", "Brandon Sanderson", 2013, "read")
  addDemoBooks("Firefight", "The Reckoners", "Brandon Sanderson", 2015, "read")
  addDemoBooks("A Deadly Education", "The Scholomance", "Naomi Novik", 2020, "unread")
  addDemoBooks("Golden Enclaves", "The Scholomance", "Naomi Novik", 2022, "unread")
  addDemoBooks("Pride and Prejudice", "", "Jane Austen", 1813, "read")
  addDemoBooks("Great Expectations", "", "Charles Dickens", 1860, "read")
  addDemoBooks("Eldest", "The Inheritance Cycle", "Christopher Paolini", 2005, "unread")
  addDemoBooks("Brisingr", "The Inheritance Cycle", "Christopher Paolini", 2008, "read")

  function addDemoBooks(title, collection, author, year, status) {
    let demoBook = new Book(title, collection, author, year, status)
    myLibrary.push(demoBook)
  };
  refreshLib()
}

// remove all child nodes
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// notifications
function myNotif(title, message, theme) {
  const myNotification = window.createNotification({
    closeOnClick: true,
    theme: theme,
    showDuration: 1800
  });

  myNotification({
    title: title,
    message: message
  });

}