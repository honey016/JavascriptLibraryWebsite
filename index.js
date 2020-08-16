console.log("This is index.js");

//comstructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}


//display constructor

function Display() {

}

//Add Methods to display prototype
Display.prototype.add = function(book) {
    console.log("Adding to UI");
    tableBody = document.getElementById('tableBody');
    let uiString = `
                <tr>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                </tr>  `;

    tableBody.innerHTML += uiString;
}

//Implement The Clear Function
Display.prototype.clear = function() {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

//Implementing the validate function
Display.prototype.validate = function(book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    } else {
        return true;
    }
}

Display.prototype.show = function(type, displayMessage) {
    let message = document.getElementById('message');
    let boldText;
    if (type === 'success') {
        boldText = 'Success';
    } else {
        boldText = 'Error';
    }
    message.innerHTML = `
                     <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                         <strong>${boldText} : </strong> ${displayMessage}
                         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                         <span aria-hidden="true">&times;</span>
                         </button>
                     </div>   `;
    setTimeout(() => {
        message.innerHTML = ''
    }, 3000);

}

//Add Submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {

    console.log("You Have submitted library form");
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;

    // mathematics,programming,aptitude
    let mathematics = document.getElementById('mathematics');
    let programming = document.getElementById('programming');
    let aptitude = document.getElementById('aptitude');


    if (mathematics.checked) {
        type = mathematics.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (aptitude.checked) {
        type = aptitude.value;
    }



    let book = new Book(name, author, type);
    console.log(book);


    let display = new Display();

    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', ' Your Book Has Been Successfully Added! ');

    } else {

        //Show error to the user
        display.show('danger', ' Sorry You Cannot Add This Book! ');

    }




    e.preventDefault();
}