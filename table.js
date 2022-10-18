let tableActive = true;
const btn = document.createElement('button');
const table = document.getElementById('tblBody');
const div = document.createElement('div');
const tbl = document.createElement('table');
const tblBody = document.createElement('tbody');

//Create a table to be able to append elements to it dynamically
function createTable () {
  tbl.appendChild(tblBody);
  document.body.appendChild(tbl);
  tblBody.setAttribute('id', 'tblBody');
}

//Get the users and dynamically render the data to the table
getUsers = () => {
    //To create SPA functionality, check if the table is active. If so, display it.
  if (tableActive === true) {
  tblBody.style.display = '';
  getPosts();
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then((json) => {
    let id;
    let tblBody = document.getElementById('tblBody')
    let headers = '<thead id="tblHeader"><tr><th>Name</th><th>Company</th><th>City</th></tr></thead>';
    let out;

    tblBody.innerHTML = headers;
    //Render table cells based on data from API
    json.forEach(row => {
      id = row.id; 
      let studentRow = document.createElement('tr');
      studentRow.setAttribute('id', id);
      
      tblBody.appendChild(studentRow);
      
      out = `<td>${row.name}</td>`;
      out += `<td>${row.company.name}</td>`;
      out += `<td>${row.address.city}</td>`;
      out += `<td><button id='btn_${id}' onclick=getPosts(${id})>User Posts</button></td>`;

      studentRow.innerHTML = out
    });
    //Click event to user post
   document.getElementById(json.id).addEventListener('click', getPosts(json.id));
  })
  } else {
    //Hide table when tableActive is false.
    //Reset to true after table is hidden in order to re-render table.
   tblBody.style.display = 'none';
    tableActive = true;
  }
};

getPosts = (id) => {
    //Render post if table is hidden
  if (tableActive === false) {
  getUsers();
  btn.setAttribute('onclick', 'getUsers()');
  
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then((json) => {
    //Filter posts by user id
    const post = json.filter(user => user.userId === id);
    let count = 0;
    
    document.body.appendChild(div);
    //Render user posts
    post.forEach(p => {
      count++;
      let paragraph = document.createElement('p');

      div.appendChild(paragraph);
      
      paragraph.innerHTML = `Post #${count}`;
      paragraph.innerHTML += "<br/>";
      paragraph.innerHTML += `Title: ${p.title}`;
      paragraph.innerHTML += "<br/>"
      paragraph.innerHTML += `Subject: ${p.body}`;
      paragraph.innerHTML += "<hr/>";
    })

    div.appendChild(btn);
    btn.innerHTML = 'View Users';
  })
  } else {
    //Reset div when table is showing
    div.innerHTML = '';
    tableActive = false;
  }
}

getUsers();
createTable();
