if (!localStorage.getItem('currentUser')) {
  window.location.href = '/login';
};

let studentData = localStorage.getItem('currentUser');
let student = JSON.parse(studentData)
let homeworkTr = document.getElementById("homework");
let outcomesTr = document.getElementById("outcomes-homework");
//create dynamic li with content

function render() {
  for (let key in student) {
    let element;

    //Check if it is a homework data
    if (key.indexOf('hw') === 0 && student[key]) {
      handleHomeworkKey(key);
    } else if (key.indexOf('Outcomes') === 0 && student[key]) {
      handleOutcomesHomework(key)
    } else {
      element = document.getElementById(key.toLowerCase());
      //Checks if we found an html element that has id of key
      if (element) {
        element.textContent = `${student[key]}`
      };
    };
  };

  //Changing deliverables total string with ',' to a number with '.'
  let totalDeliverablesScorePlaceholder = document.getElementById('deliverables');
  if (totalDeliverablesScorePlaceholder.textContent) {
    let totalToNum = parseStringToFloatNumber(totalDeliverablesScorePlaceholder.textContent);
    totalDeliverablesScorePlaceholder.textContent = `${totalToNum}%`;
  };
};

function handleOutcomesHomework(key) {
  let outcomesTableHeads = document.getElementById('outcomes-tableHeads');
  let outcomesTableHeadEL = document.createElement('th');
  outcomesTableHeadEL.textContent = key;
  outcomesTableHeads.appendChild(outcomesTableHeadEL);
  //create a square element for each homework
  let element = document.createElement('td');
  element.setAttribute('id', key);
  outcomesTr.appendChild(element);
  // Paint table square
  addColorToHomework(key, element)
};

//Render Homework data on the page
function handleHomeworkKey(key) {
  let tableHeads = document.getElementById('tableHeads');
  let tableHeadEL = document.createElement('th');
  tableHeadEL.textContent = key;
  tableHeads.appendChild(tableHeadEL);
  //create a square element for each homework
  let element = document.createElement('td');
  element.setAttribute('id', key);
  homeworkTr.appendChild(element);
  // Paint table square
  addColorToHomework(key, element)
};

// Adds color according to value of the key
function addColorToHomework(key, element) {
  if (student[key] === 'Complete') {
    element.setAttribute('class', 'complete')
  } else if (student[key] === 'Incomplete') {
    element.setAttribute('class', 'incomplete')
  } else if (student[key] === 'Missing') {
    element.setAttribute('class', 'missing')
  } else if (student[key] === 'Submitted') {
    element.setAttribute('class', 'submitted')
    element.textContent = 'Submitted'
  };
};

//Converts '62,65' to a number 62,6
function parseStringToFloatNumber(str) {
  return parseFloat(str.replace(/,/, '.')).toFixed(1);
};

//Add eventListeners to a button
let logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', handleLogout);

function handleLogout() {
  localStorage.removeItem('currentUser');
};

// Triger render()
render();