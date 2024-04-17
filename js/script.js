let myLibrary = [];

class Book{
  constructor(name,author,pages,isFinished){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isFinished = isFinished;
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
    booksContainer.insertAdjacentHTML("beforeend",
`
<div class="book" data-name="${book.name}">
  <ul>
    <li>Title: ${book.name}</li>
    <li>Author: ${book.author}</li>
    <li>Pages: ${book.pages}</li>
    <li>Status: ${book.isFinished ? "Finished" : "Unfinished"}</li>
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
    .filter(e => !(e.name == targetBookName));
  
  renderBooks();
}

function changeStatus(e){
  const targetBookName = 
    e.target.parentElement.parentElement.dataset.name;

  myLibrary = myLibrary.map(e => {
    if(e.name == targetBookName){
      e.isFinished = !e.isFinished;
    }
    return e;
  });

  console.log(myLibrary);
  renderBooks();
}

const form = document.querySelector("form");
form.addEventListener("submit",function(e){
  e.preventDefault();
  addBookToLibrary();
  form.reset();
  renderBooks();
});