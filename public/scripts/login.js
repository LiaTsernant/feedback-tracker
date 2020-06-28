if (localStorage.getItem('currentUser')) {
  window.location.href = '/profile';
};

//Create title options
fetch('/api/v1/protected_routes/get_course_titles').
  then(res => res.json()).
  then(res => {
    let titlesContainer = document.getElementById('title-options');
    for (let i = 0; i < res.courseTitles.length; i += 1) {
      let option = document.createElement('option');
      option.textContent = res.courseTitles[i];
      titlesContainer.appendChild(option)
    };
  }).
  catch(err => console.log(err))

let loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', handleLogin);
let studentId = document.getElementById('studentId');
let studentEmail = document.getElementById('email');
studentId.value = "";
studentEmail.value = "";

function handleLogin(event) {
  event.preventDefault();

  let courseTitle = document.getElementById('title-options').value;
  let formData = {};
  if (studentId.value === "") {
    studentId.classList.add('is-invalid');
  } else if (studentEmail.value === "") {
    studentEmail.classList.add('is-invalid')
  } else {
    formData = {
      studentId: studentId.value,
      email: studentEmail.value,
      courseTitle: courseTitle,
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
          studentEmail.classList.add('is-invalid');
        }
      }).
      catch(err => console.log(err))
  };
};