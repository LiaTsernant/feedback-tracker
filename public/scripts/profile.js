if (!localStorage.getItem('currentUser')) {
  window.location.href = '/login';
};

let studentData = localStorage.getItem('currentUser');
let student = JSON.parse(studentData)

function render() {
  for (let key in student) {
    let element = document.getElementById(key.toLowerCase());

    if (student[key] === 'Complete') {
      element.setAttribute('class', 'complete')
    } else if (student[key] === 'Incomplete') {
      element.setAttribute('class', 'incomplete')
    } else if (student[key] === 'Missing') {
      element.setAttribute('class', 'missing')
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