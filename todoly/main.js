class Todo {
  constructor(id, msg, is_done) {
    this.msg = msg;
    this.is_done = is_done;
    this.id = id;
  }
}

const API_URL = 'https://t4p4n.github.io/todoly/changelog.json';

async function fetchchangelog() {
 try{
   const response = await fetch(API_URL)
   const changelog = await response.json();
   return changelog;
  }catch(err){
    console.error(err); 
  }
}


let id = 0;
var btnsbt = document.getElementById("btn-sbt");
btnsbt.addEventListener("click", addTodo);

// get user input from form!
var msg = document.getElementById("msg-input");

// get container
var todoContainer = document.querySelector(".container");

todoContainer.addEventListener("click", function (e) {
  if (e.target.id === "btn-x") {
    removeTodo(e);
  } else e.target.id === "btn-c";
  {
    markDone(e);
  }
});

let toDos
const loadDom = async () => {
  toDos = localStorage.getItem("my-todos")
  ? JSON.parse(localStorage.getItem("my-todos"))
  : fetchchangelog().then(changelog => localStorage.setItem("my-todos", JSON.stringify(changelog.changelog.msgs)))
  .then(changelog => {
    toDos = localStorage.getItem("my-todos")
    ? JSON.parse(localStorage.getItem("my-todos")): console.log("nope");
    return (toDos.forEach
      (async function (i) {
          limaker(await i.msg, await i.is_done);
        }))
    // fetched changelog
    
  });
  try {
    toDos.forEach
      (async function (i) {
          limaker(await i.msg, await i.is_done);
        });
  }
  catch(err){
    console.log(err); 
  }
}


loadDom();


function addTodo(e) {
  e.preventDefault();
  // console.log('Clicked');
  var message = msg.value;
  if (message.length >= 1) {
    // console.log('it worked')
    let is_done = false;
    id++;
    // console.log(id);
    let td = new Todo(id, message, is_done);
    toDos.push(td);
    // Store obj in toDos array & set todos array as value in lc strg.
    localStorage.setItem("my-todos", JSON.stringify(toDos));
    limaker(message, is_done);
  } else {
    // console.log("please enter 3 or more letters.!")
  }
}

function undoMarkDone(e) {
  e.preventDefault();
  console.log("yes");
  var li = e.target.parentElement;
  var msg1 = li.firstChild.textContent;

  todoContainer.removeChild(li);

  localStorage.setItem("my-todos", JSON.stringify(toDos));
  // mark done false
  toDos.forEach(function (toDo, index) {
    if (toDo.msg === msg1) {
      toDos[index].is_done = false;
      localStorage.setItem("my-todos", JSON.stringify(toDos));
    }
  });
  limaker(msg1, false);
}

function limaker(message, is_done) {
  // add todo to dom
  var li = document.createElement("li");
  li.className = "todo-item animate__animated animate__fadeInDown";
  if (is_done === true) {
    li.addEventListener("dblclick", undoMarkDone);

    var strk = document.createElement("strike");
    strk.appendChild(document.createTextNode(message));
    li.appendChild(strk);
    var btn = document.createElement("span");
    btn.textContent = "❌";
    btn.setAttribute("id", "btn-x");
    li.appendChild(btn);
    todoContainer.appendChild(li);
    // clear msg-input
    msg.value = "";
  } else {
    li.appendChild(document.createTextNode(message));
    btn = document.createElement("span");
    btn.textContent = "❌";
    btn.setAttribute("id", "btn-x");
    var btnchk = document.createElement("span");
    btnchk.textContent = "✔️";
    btnchk.setAttribute("id", "btn-c");
    li.appendChild(btn);
    li.appendChild(btnchk);

    todoContainer.appendChild(li);
    // clear msg-input
    msg.value = "";
  }
}

function removeTodo(e) {
  e.preventDefault();
  // Remove ELement from DOM
  if (e.target.id === "btn-x") {
    var li = e.target.parentElement;
    li.className = "todo-item animate__animated animate__fadeOutDown";
    setTimeout(() => {
      todoContainer.removeChild(li);
    }, 400);
  }
  //Remove Obj from array using the splice method!
  var msg1 = li.firstChild.textContent;
  toDos.forEach(function (toDo, index) {
    if (toDo.msg === msg1) {
      toDos.splice(index, 1);
    }
  });
  localStorage.setItem("my-todos", JSON.stringify(toDos));
}

// Mark a element as if clicked on check
function markDone(e) {
  e.preventDefault();
  if (e.target.id === "btn-c") {
    var li = e.target.parentElement;
    li.addEventListener("dblclick", undoMarkDone);
    var msg1 = li.firstChild.textContent;
    li.textContent = "";

    // creating a new element with strike thorugh tag in it
    var strk = document.createElement("strike");
    strk.appendChild(document.createTextNode(msg1));
    li.className = "todo-item animate__animated animate__headShake";
    li.appendChild(strk);

    var btn = document.createElement("span");
    btn.textContent = "❌";
    btn.setAttribute("id", "btn-x");
    li.appendChild(btn);
    // mark is_done = true
    toDos.forEach(function (toDo, index) {
      if (toDo.msg === msg1) {
        toDos[index].is_done = true;
        localStorage.setItem("my-todos", JSON.stringify(toDos));
      }
    });
  }
}

// Theme stuff
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }    
}

// load user theme from lc
toggleSwitch.addEventListener('change', switchTheme, false);

function switchTheme(e) {
  if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark'); //add this
  }
  else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light'); //add this
  }    
}

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function hideLogo() {
  var logo = document.querySelector("h1");
  var formdiv = document.querySelector(".form-div")
  if (logo.style.display === "block") {
    formdiv.style.marginTop = "1em"
    logo.style.display = "none";
  } else {
    logo.style.display = "block";
  }
}

const getLogo = document.querySelector('.toogle').addEventListener('click', hideLogo)