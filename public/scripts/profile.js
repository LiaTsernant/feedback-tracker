if (!localStorage.getItem('currentUser')) {
  window.location.href = '/login';
};

let studentData = localStorage.getItem('currentUser');
let student = JSON.parse(studentData)

function render() {
  for (let key in student) {
    let element = document.getElementById(key.toLowerCase());
    if (element) {
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