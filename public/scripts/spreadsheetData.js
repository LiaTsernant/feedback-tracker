// console.log('Test!!!!!!!!!!!')

// fetch('/api/v1/protected_routes/doc').
//   then(buffer => buffer.json()).
//   then(res => console.log(res)).
//   catch(err => console.log(err))

async function jsonData(url) { // (1)
  let res = await fetch(url); // (2)

  // console.log(res)

  if (res.status === 200) {
    let json = await res.json();
    console.log(json)
  }

  // throw new Error(res.status);
}

jsonData('/api/v1/protected_routes/doc')
  .catch(alert); // Error: 404 (4)
