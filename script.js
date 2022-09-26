/* Table of contents

1. Data
2. User Interface
3. Modal
4. Demo Data
5. Notifications
6. Collections
7. Horinzontal scrolling





*/

// --------------------
// 1. Data 
let myLibrary = [];

function Book(title, collection, author, year, status) {
  this.title = title,
    this.collection = collection,
    this.author = author,
    this.year = year,
    this.status = status
}

addDemoDataToLibrary();

// --------------------
// 2. User Interface

// refresh UI to fit with content of myLibrary
function refreshLib() {
  let booksShelf = document.querySelector(".books__shelf")

  // start afresh everytime
  removeAllChildNodes(booksShelf);

  // rebuilt UI library
  myLibrary.forEach(book => {
    // create the container
    let bookContainer = document.createElement("div")
    bookContainer.classList.add("book__container")
    booksShelf.appendChild(bookContainer);

    // create the title 
    let bookTitle = document.createElement("div")
    bookTitle.classList.add("book__title")
    bookContainer.appendChild(bookTitle);
    bookTitle.textContent = book.title;

    // create the author
    let bookAuthor = document.createElement("div")
    bookAuthor.classList.add("book__author")
    bookContainer.appendChild(bookAuthor);
    bookAuthor.textContent = book.author;

    // create the collection
    let bookCollection = document.createElement("div")
    bookCollection.classList.add("book__collection")
    bookContainer.appendChild(bookCollection);
    bookCollection.textContent = book.collection;

    // create the year
    let bookYear = document.createElement("div")
    bookYear.classList.add("book__year")
    bookContainer.appendChild(bookYear);
    bookYear.textContent = book.year;

    // create the reading status
    let bookStatus = document.createElement("div")
    bookStatus.classList.add("book__status", "btn")
    bookContainer.appendChild(bookStatus);
    bookStatus.textContent = book.status;

    // check book read/unread status
    // and assign the appropriate class
    if (book.status == "read") {
      bookStatus.classList.add("is-read")
    } else if (book.status == "unread") {
      bookStatus.classList.add("is-unread")
    }

    // add delete button
    let deleteButtonContainer = document.createElement("div")
    let deleteButton = document.createElement("i")
    deleteButtonContainer.classList.add("book__delete");
    deleteButton.classList.add("ri-delete-bin-7-fill")
    bookContainer.appendChild(deleteButtonContainer)
    deleteButtonContainer.appendChild(deleteButton)

  });
  // activate the toggling between read/unread state
  toggleReadUnread();
  refreshCollections();
};


// button for testing (on top left logo)
const testingButton = document.querySelector(".logo")
testingButton.addEventListener("click", () => {
  myNotif("Congratulations!", "You found the secret button.", "success")
});



// button: toggle read/unread state on each book
function toggleReadUnread() {
  // toggle status visually
  const readingStatus = document.querySelectorAll(".book__status")

  readingStatus.forEach((button) => {

    button.addEventListener("click", () => {

      let book = button.parentElement;
      let bookChildren = book.childNodes

      // target .book__status
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

      // show notification about changed status
      myNotif(bookChildren[0].textContent, "has been marked " + bookChildren[4].textContent.toUpperCase() + ".", "info")

      // change data in myLibrary
      myLibrary.forEach(item => {
        if (item.title === bookChildren[0].textContent) {
          if (item.status === "read") {
            item.status = "unread"
          } else if (item.status === "unread") {
            item.status = "read"
          }

        }
      }
      
    
      )
      refreshLib();

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
          myNotif(bookTitle, "has been removed from your library.", "error")
          refreshLib();
        };
      });

      // remove visible element --  https://bobbyhadz.com/blog/javascript-remove-parent-element
      button.parentElement.remove();
    })
  });

};


// --------------------
// 3. Modal
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

// 4. Add demo data
const btnAddDemoData = document.querySelector(".left-panel__btn-add-data")
btnAddDemoData.addEventListener("click", addDemoDataToLibrary)

function addDemoDataToLibrary() {
  console.log("Demo data has been added.")
  myNotif("Demo data successfully added", "from my favorite books.", "success")
  addDemoBooks("Skyward", "Skyward", "Brandon Sanderson", 2018, "unread")
  addDemoBooks("Starsight", "Skyward", "Brandon Sanderson", 2019, "read")
  addDemoBooks("Steelheart", "The Reckoners", "Brandon Sanderson", 2013, "read")
  addDemoBooks("Firefight", "The Reckoners", "Brandon Sanderson", 2015, "read")
  addDemoBooks("A Deadly Education", "The Scholomance", "Naomi Novik", 2020, "unread")
  addDemoBooks("Golden Enclaves", "The Scholomance", "Naomi Novik", 2022, "unread")
  addDemoBooks("Pride and Prejudice", "", "Jane Austen", 1813, "read")
  addDemoBooks("Great Expectations", "", "Charles Dickens", 1860, "read")
  addDemoBooks("Eldest", "The Inheritance Cycle", "Christopher Paolini", 2005, "unread")
  addDemoBooks("Eragon", "The Inheritance Cycle", "Christopher Paolini", 2002, "read")
  addDemoBooks("Brisingr", "The Inheritance Cycle", "Christopher Paolini", 2008, "read")
  addDemoBooks("Harry Potter and the Order of the Phoenix", "Harry Potter", "J.K Rowlings", "2003", "read")
  addDemoBooks("Harry Potter and the Philosopher's Stone", "Harry Potter", "J.K Rowlings", "1997", "read")
  addDemoBooks("Harry Potter and the Chamber of Secrets", "Harry Potter", "J.K Rowlings", "1998", "unread")

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

// 5. Notifications
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

// 6. Collections
function refreshCollections() {
  let shelf = document.querySelector(".collections__shelf")
  removeAllChildNodes(shelf);

  let myLibraryCollections = myLibrary.group((book) => book.collection)


  let onlyCollections = []

  myLibrary.forEach(book => {
    if (book.collection !== "") {
      onlyCollections.push(book.collection)
    }
  });

  onlyCollections = new Set(onlyCollections)

  onlyCollections.forEach(collection => {

    let collContainer = document.createElement("div")
    collContainer.classList.add("collection__container")

    let collName = document.createElement("div")
    collName.textContent = collection
    collName.classList.add("collection__name")

    let collAuthor = document.createElement("div")
    collAuthor.textContent = myLibraryCollections[collection][0]["author"]
    collAuthor.classList.add("collection__author")

    let collNum = document.createElement("div")
    collNum.textContent = getPluralOrSingular()

    function getPluralOrSingular() {
      if (myLibraryCollections[collection].length === 1) {
        return myLibraryCollections[collection].length + " book"
      } else if (myLibraryCollections[collection].length > 1) {
        return myLibraryCollections[collection].length + " books"
      }
    }
    myLibraryCollections[collection].length + " books"
    collNum.classList.add("collection__number-of-books")

    let progressDiv = document.createElement("div")
    let progress = document.createElement("progress")

    progress.max = myLibraryCollections[collection].length
    progress.value = 0

    myLibraryCollections[collection].forEach(book => {
      let statuses = Array(book.status)

      statuses.forEach(status => {
        if (status === "read") {
          progress.value += 1
        }
      })
    })


    shelf.appendChild(collContainer)
    collContainer.appendChild(collAuthor)
    collContainer.appendChild(collName)
    collContainer.appendChild(collNum)
    collContainer.appendChild(progressDiv)
    progressDiv.appendChild(progress)



  })
};

// 7. Horinzontal scolling
const scrollContainer = document.querySelector(".collections__shelf");

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});