if (!localStorage.getItem('currentUser')) {
  window.location.href = '/login';
};

let studentData = localStorage.getItem('currentUser');
let student = JSON.parse(studentData)
let homeworkTr = document.getElementById("homework");
//create dynamic li with content

function render() {
  for (let key in student) {
    let element;

    if (key.slice(0, 2) === 'hw' && student[key]) {
      //create a table head element with the name of the homework
      let tableHeads = document.getElementById('tableHeads');
      let tableHeadEL = document.createElement('th');
      tableHeadEL.textContent = key;
      tableHeads.appendChild(tableHeadEL);

      //create a square element for each homework
      element = document.createElement('td');
      element.setAttribute('id', key);
      homeworkTr.appendChild(element)
    } else {
      element = document.getElementById(key.toLowerCase());
    };

    if (student[key] === 'Complete') {
      element.setAttribute('class', 'complete')
    } else if (student[key] === 'Incomplete') {
      element.setAttribute('class', 'incomplete')
    } else if (student[key] === 'Missing') {
      element.setAttribute('class', 'missing')
    } else if (student[key] === 'Submitted') {
      element.setAttribute('class', 'submitted')
      element.textContent = 'Submitted'
    } else if (element) {
      element.textContent = `${student[key]}`
    };
  };
};

let logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', handleLogout);

function handleLogout() {
  localStorage.removeItem('currentUser');
};

render();