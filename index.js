let addNewBook = document.querySelector(".addNewBook");
let dialog = document.querySelector("dialog");
let save = document.querySelector("dialog .save");
let closeBtn = document.querySelector(".closeD");
let read = document.querySelector(".read");
let main = document.querySelector(".main");
let titleInput = document.querySelector("#title");
let authorInput = document.querySelector("#author");

const myLibrary = [];

class Book{
    constructor(title, author, read) {
        this.title = title;
        this.author = author;
        this.read = read;
        this.index = null;
    }

    toggleReadStatus(){
        this.read = !this.read;
    }

    getReadStatusText(){
        return this.read ? "Read" : "Not Read";
    }
}

function addBookToLibrary(title, author, read) {
    let newBook = new Book(title, author, read);
    newBook.index = myLibrary.length + 1;
    myLibrary.push(newBook);
    renderCards();
}

function createDialog() {
    dialog.showModal();
}

function closeDialog() {
    dialog.close();
}

function toggleText(e) {
    if(e.target.classList.contains("read")){
        const cardElement = e.target.closest(".card");
        const index = cardElement.getAttribute("data-index");
        const book = myLibrary[index];

        book.toggleReadStatus();
        e.target.innerHTML = book.getReadStatusText(); 
    }
}

function renderCards() {
    main.innerHTML = "";

    myLibrary.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");

        cardElement.setAttribute("data-index", index);

        cardElement.innerHTML = `
            <h2>${card.title}</h2>
            <p>~ by ${card.author}</p>
        `;

        let readStatus = document.createElement("button");
        readStatus.innerText = card.getReadStatusText();
        readStatus.classList.add("read");
        cardElement.appendChild(readStatus);


        let deleteCard = document.createElement("button");
        deleteCard.innerText = "Delete";
        deleteCard.classList.add("deleteTheCard");
        cardElement.appendChild(deleteCard);

        main.appendChild(cardElement);
    });
}

function getInputData() {
    let title = titleInput.value.trim();
    let author = authorInput.value.trim();

    if(!title || !author){
        alert("Both title and author are required!");
        return;
    }

    let readStatus = read.innerText === "Read";
    addBookToLibrary(title, author, readStatus);

    titleInput.value = "";
    authorInput.value = "";
}

function deleteTargetCard(e) {
    if(e.target.classList.contains("deleteTheCard")){
        const cardElement = e.target.closest(".card");
        const index = cardElement.getAttribute("data-index");

        myLibrary.splice(index,1);

        myLibrary.forEach((book, idx) => {
            book.index = idx + 1;
        })

        renderCards();
    }
}

addNewBook.addEventListener("click", createDialog);
closeBtn.addEventListener("click", closeDialog);

save.addEventListener("click", (e) => { 
    e.preventDefault();
    closeDialog();
    getInputData();
});


read.addEventListener("click", (e) => { toggleText(e) });
main.addEventListener("click",(e)=>{deleteTargetCard(e)});