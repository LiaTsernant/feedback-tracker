if (localStorage.getItem('currentUser')) {
  window.location.href = '/profile';
};

let loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', handleLogin);
let studentId = document.getElementById('studentId');
let courseTitle = document.getElementById('courseTitle');
let studentEmail = document.getElementById('email');
studentId.value = "";
courseTitle.value = "";
studentEmail.value = "";

function handleLogin(event) {
  event.preventDefault();
  let formData = {};

  if (studentId.value === "") {
    studentId.classList.add('is-invalid');
  } else if (courseTitle.value === "") {
    courseTitle.classList.add('is-invalid')
  } else if (studentEmail.value === "") {
    studentEmail.classList.add('is-invalid')
  } else {
    formData = {
      studentId: studentId.value,
      email: studentEmail.value,
      courseTitle: courseTitle.value.toUpperCase()
    };

    fetch('/api/v1/protected_routes/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'credentials': 'include',
      },
      body: JSON.stringify(formData),
    }).then(res => res.json()).
      then(res => {
        if (res.status === 200) {
          console.log(res.student)
          localStorage.setItem('currentUser', JSON.stringify(res.student))
          window.location = '/profile';
        } else {
          studentId.classList.add('is-invalid');
          courseTitle.classList.add('is-invalid');
          studentEmail.classList.add('is-invalid');
        }
      }).
      catch(err => console.log(err))
  };
};