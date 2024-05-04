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
form.addEventListener("submit",function(e){
  e.preventDefault();
  addBookToLibrary();
  form.reset();
  renderBooks();
});