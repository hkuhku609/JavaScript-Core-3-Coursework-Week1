let myLibrary = [];

window.addEventListener('load', function (e) {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length === 0) {
    let book1 = new Book('Robison Crusoe', 'Daniel Defoe', '252', true);
    let book2 = new Book(
      'The Old Man and the Sea',
      'Ernest Hemingway',
      '127',
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
  }
}

const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const check = document.getElementById('check');

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function submit() {
  if (!title.value && !pages.value) {
    alert('Please fill all fields!');
    return false;
  } else {
    let book = new Book(title.value, author.value, pages.value, check.checked);
    myLibrary.push(book);
    render();
  }
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  //insert updated row and cells
  const table = document.getElementById('display');
  let length = myLibrary.length;
  let rowsNumber = table.rows.length;

  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }
  for (let i = 0; i < length; i++) {
    const row = table.insertRow(1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    cell1.textContent = myLibrary[i].title;
    cell2.textContent = myLibrary[i].author;
    cell3.textContent = myLibrary[i].pages;

    //add and wait for action for read/unread button
    const changeBut = document.createElement('button');
    changeBut.id = `change-` + i;
    changeBut.className = 'btn btn-success';
    changeBut.textContent = myLibrary[i].check ? 'Yes' : 'No';
    cell4.append(changeBut);
    changeBut.addEventListener('click', () => {
      myLibrary[i].check = !myLibrary[i].check;
      changeBut.textContent = myLibrary[i].check ? 'Yes' : 'No';
    });

    //add delete button to every row and render again
    const delBut = document.createElement('button');
    delBut.id = `delete-` + i;
    delBut.className = 'btn btn-warning';
    delBut.textContent = 'Delete';
    cell5.append(delBut);
    delBut.addEventListener('click', () => {
      alert(`You've deleted title: ${myLibrary[i].title}`);
      myLibrary.splice(i, 1);
      render();
    });
  }
}
