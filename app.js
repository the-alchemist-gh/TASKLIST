const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');



// Load All Event Listeners

loadEventListeners();
checkCount();

function checkCount(){
  if(taskList.childElementCount < 1){
    clearBtn.style.display = "none";
  } else {
    clearBtn.style.display = "inline-block";
  }
}

function loadEventListeners(){

  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);

  // Add task
  form.addEventListener('submit', addTask);

  // remove task
  taskList.addEventListener('click', removeList);

  // clear tasks
  clearBtn.addEventListener('click', clearList);

  //filter tasks event
   filter.addEventListener('keyup', filterTask);
}

// get tasks from local storage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];

  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(
    (task)=>{
       // Create list item

      const li = document.createElement('li');

      li.className = 'collection-item';

      // create text node and append to li
      li.appendChild(document.createTextNode(task));

      // create delete icon
      // li.innerHTML = '<a class="delete-item secondary-content"><i class="fa-fa-remove"></i></a>'
      liLink = document.createElement('a');
      liLink.className = 'delete-item secondary-content';
      liLink.innerHTML = '<i class="fa fa-remove"></i>';

      li.appendChild(liLink);
      // add li to ul
      taskList.appendChild(li);

    }
  );
    checkCount();
}

// Add Task
function addTask(e){
  if(taskInput.value === ''){
    alert('Kindly Add a Task');
  }

  // Create list item

  const li = document.createElement('li');

  li.className = 'collection-item';

  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  // create delete icon
  // li.innerHTML = '<a class="delete-item secondary-content"><i class="fa-fa-remove"></i></a>'
  liLink = document.createElement('a');
  liLink.className = 'delete-item secondary-content';
  liLink.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(liLink);
  // add li to ul
  taskList.appendChild(li);

  // Store in localStorage
  storeTaskInLocalStorage(taskInput.value);

  // clear input
  taskInput.value = "";

//  console.log(taskList.firstChild); 
  checkCount();
  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];

  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeList(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    deletedItem = e.target.parentElement.parentElement.textContent;
    if(confirm("Are you sure you want to delete " + deletedItem + " ?")){
      
      e.target.parentElement.parentElement.remove();

      // remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
  checkCount()
}

// remove from Ls
function removeTaskFromLocalStorage(taskItem){
  // console.log(taskItem);
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];

  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index)=>{
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear tasks
function clearList(){
  // taskList.innerHTML='';
  if(taskList.firstChild){
    if(confirm('Are you sure you want to delete everything?')){
      while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
        clearFromLocalStorage(taskList.firstChild);
      }
    }
  }
  

  checkCount();
}

function clearFromLocalStorage(){
  localStorage.clear();
}

// filter Tasks
function filterTask(e){
  const text = e.target.value.toLowerCase();
  console.log(text);
  
  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
      // console.log(item.indexOf(text));
    }
  )
}
