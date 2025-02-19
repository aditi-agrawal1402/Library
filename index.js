let addNewBook = document.querySelector(".addNewBook");
let dialog = document.querySelector("dialog");
let save = document.querySelector("dialog .save");
let closeBtn = document.querySelector(".closeD");
let read = document.querySelector(".read");
let main = document.querySelector(".main");
let titleInput = document.querySelector("#title");
let authorInput = document.querySelector("#author");
// let deleteBtn = document.querySelector(".deleteTheCard");

const myLibrary = [];

function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.index = myLibrary.length + 1;
}

function addBookToLibrary(title, author, read) {
    let newBook = new Book(title, author, read);
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
    if (e.target.innerHTML == "Read") {
        e.target.innerHTML = "Not Read";
    }
    else {
        e.target.innerHTML = "Read";
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
        `
        let readStatus = document.createElement("button");
        if (card.read) {
            readStatus.innerText = "Read";
        }
        else {
            readStatus.innerText = "Not Read";
        }
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
    let title = titleInput.value;
    let author = authorInput.value;
    let readStatus = true;
    if (read.innerText == "Not Read") {
        readStatus = false;
    }
    addBookToLibrary(title, author, readStatus);

    titleInput.value = "";
    authorInput.value = "";
}

function deleteTargetCard(e) {
    // console.log(e);
    if(e.target.classList.contains("deleteTheCard")){
        const cardElement = e.target.closest(".card");
        const index = cardElement.getAttribute("data-index");

        myLibrary.splice(index,1);

        renderCards();
    }
}

addNewBook.addEventListener("click", createDialog);
save.addEventListener("click", closeDialog);
save.addEventListener("click", getInputData);
closeBtn.addEventListener("click", closeDialog);
read.addEventListener("click", (e) => { toggleText(e) });
save.addEventListener("click", (e) => { e.preventDefault() });
main.addEventListener("click",(e)=>{deleteTargetCard(e)});

// addBookToLibrary("Harry Potter","J.K. Rowling", true);
// addBookToLibrary("Game of thrones", "Nai pata", false);
// addBookToLibrary("Throne of glass", "Sarah J. Mass", true);

// myLibrary.forEach(book => {
//     createCard(book.title, book.author, book.read);
// });