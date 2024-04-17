const myLibrary = [];

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

const form = document.querySelector("form");
form.addEventListener("submit",function(e){
  e.preventDefault();
  addBookToLibrary();
  form.reset();
});