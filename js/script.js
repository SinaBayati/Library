let myLibrary = [];

class Book{
  constructor(name,author,pages,isFinished){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isFinished = isFinished;
  }

  get isFinished(){
    return this._isFinished;
  }
  set isFinished(boolVal){
    this._isFinished = boolVal;
  }
}

function addBookToLibrary(){
  const bookName = 
    document.querySelector("#name").value;
  const bookAuthor = 
    document.querySelector("#author").value;
  const bookPages = 
    document.querySelector("#pages").value;
  const bookIsFinished = 
    document.querySelector("#isFinished").checked;

  const newBook = new Book(
    bookName,
    bookAuthor,
    bookPages,
    bookIsFinished,
  );

  myLibrary.push(newBook)
}

function renderBooks(){
  const booksContainer = 
    document.querySelector(".books-container");

  booksContainer.innerHTML = null;

  myLibrary.forEach(book => {
    const bookName = book.name;
    const bookAuthor = book.author;
    const bookPages = book.pages;
    const bookIsFinished = book.isFinished;

    booksContainer.insertAdjacentHTML("beforeend",
`
<div class="book" data-name="${book.name}">
  <ul>
    <li>Title: ${bookName}</li>
    <li>Author: ${bookAuthor}</li>
    <li>Pages: ${bookPages}</li>
    <li>Status: ${bookIsFinished ? "Finished" : "Unfinished"}</li>
  </ul>
  <div>
    <button onclick="removeItem(event)">Remove Item</button>
    <button onclick="changeStatus(event)">Change Status</button>
  </div>
</div>
`);
  });
}

function removeItem(e){
  const targetBookName = 
    e.target.parentElement.parentElement.dataset.name;
    
  myLibrary = myLibrary
    .filter(book => !(book.name == targetBookName));
  
  renderBooks();
}

function changeStatus(e){
  const targetBookName = 
    e.target.parentElement.parentElement.dataset.name;

  myLibrary = myLibrary.map(book => {
    if(book.name == targetBookName){
      book.isFinished = !book.isFinished;
    }
    return book;
  });

  console.log(myLibrary);
  renderBooks();
}

const form = document.querySelector("form");

function showError(){
  const name = form.querySelector("input#name");
  const author = form.querySelector("input#author");
  const pages = form.querySelector("input#pages");

  if (!name.checkValidity()) {
    const errorEl = form.querySelector("#name-error");
    errorEl.textContent = name.validationMessage;
    errorEl.classList.add("active");
    name.classList.add("invalid");
  } else if (!author.checkValidity()) {
    const errorEl = form.querySelector("#author-error");
    errorEl.textContent = author.validationMessage;
    errorEl.classList.add("active");
    author.classList.add("invalid");
  } else if (!pages.checkValidity()) {
    const errorEl = form.querySelector("#pages-error");
    errorEl.textContent = pages.validationMessage;
    errorEl.classList.add("active");
    pages.classList.add("invalid");
  }
}

function resetError(){
  const inputElements = form.querySelectorAll("input");
  inputElements.forEach(e => {
    e.classList.remove("invalid");
  });

  const errorElements = form.querySelectorAll("span.error");
  errorElements.forEach(e => {
    e.classList.remove("active");
  });
}

form.addEventListener("submit",function(e){
  e.preventDefault();
  if (form.checkValidity()) {
    addBookToLibrary();
    form.reset();
    renderBooks();
    resetError();
  } else {
    showError();
  }
});