
// DATA  localstorage section inputs
//This loads your saved tasks from localStorage when the page opens the parse made it from num to an array  that empty
// array is if nothing is saved yet just start from an empty array no stress 
//localSto.... go and fetch the saved tasks. If there are none, use an empty array instead.
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// load saved timer state
// coverts parseInt turns text to real number
// 25*60 makes it defauit 1500 swconds (25 minutes) 
let secondsLeft  = parseInt(localStorage.getItem('secondsLeft')) || 25 * 60;

//localStorage only saves text so true gets saved as the word 'true'
/// !== 'false' means — if the saved value is NOT the word false, then isStudying = true
//So it defaults to true if nothing is saved
let isStudying   = localStorage.getItem('isStudying') !== 'false'; // default true

// timerRunning tracks if the timer is currently ticking
// timerInterval will hold the setInterval later so we can stop it later
let timerRunning = false;  // never auto-run on page load
let timerInterval;

// save the task to the  localStorage 
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));//convert to text and save it eith a key name 'tasks'
}

// save timer state to localStorage
function saveTimer() {
  localStorage.setItem('secondsLeft', secondsLeft);
  localStorage.setItem('isStudying',  isStudying);
}

//The tasks performing functions
function addTask() {
  const subject  = document.getElementById('subjectInput').value.trim();
  const desc     = document.getElementById('descInput').value.trim();
  const deadline = document.getElementById('deadlineInput').value;

  if (subject === '' || desc === '' || deadline === '') {
    alert('Please fill in all fields to add a task!');
    return;
  }

  const newTask = {
    id:       Date.now(),
    subject:  subject,
    desc:     desc,
    deadline: deadline,
    done:     false
  };

  tasks.push(newTask);
  saveTasks();
  showTasks();

  document.getElementById('subjectInput').value  = '';
  document.getElementById('descInput').value     = '';
  document.getElementById('deadlineInput').value = '';
}


function deleteTask(id) {
  tasks = tasks.filter(function(task) {
    return task.id !== id;
  });

  saveTasks();
  showTasks();
}

function markDone(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].done = !tasks[i].done;
    }
  }

  saveTasks();
  showTasks();
}

function editTask(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      let newSubject  = prompt('Edit the subject:', tasks[i].subject);
      let newDesc     = prompt('Edit the description:', tasks[i].desc);
      let newDeadline = prompt('Edit deadline (YYYY-MM-DD):', tasks[i].deadline);

      if (newSubject  !== null) tasks[i].subject  = newSubject.trim();
      if (newDesc     !== null) tasks[i].desc     = newDesc.trim();
      if (newDeadline !== null) tasks[i].deadline = newDeadline.trim();
    }
  }

  saveTasks();
  showTasks();
}


function showTasks() {
  let list = document.getElementById('taskList');
  list.innerHTML = '';

  if (tasks.length === 0) {
    list.innerHTML = '<p id="emptyMsg">No tasks yet. Add one above!</p>';
    updateProgress();
    return;
  }

  for (let i = 0; i < tasks.length; i++) {
    let t = tasks[i];

    let div = document.createElement('div');
    div.className = 'task' + (t.done ? ' done' : '');

    div.innerHTML =
      '<div class="taskTitle">' + t.subject + '</div>' +
      '<div class="taskDesc">'  + t.desc    + '</div>' +
      '<div class="taskDate">📅 Due: ' + t.deadline + '</div>' +
      '<button style="background:#2dc653" onclick="markDone(' + t.id + ')">' +
        (t.done ? 'Undo' : '✔ Done') +
      '</button>' +
      '<button style="background:orange"  onclick="editTask('   + t.id + ')">✏ Edit</button>' +
      '<button style="background:#e63946" onclick="deleteTask(' + t.id + ')">🗑 Delete</button>';

    list.appendChild(div);
  }

  updateProgress();
}
// PROGRES

function updateProgress() {
  let total = tasks.length;
  let done  = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].done) {
      done++;
    }
  }

  let percent = total === 0 ? 0 : Math.round((done / total) * 100);

  document.getElementById('progressFill').style.width = percent + '%';
  document.getElementById('progressText').textContent = done + ' of ' + total;
}








// POMODORO TIMER


function updateTimerDisplay() {
  let mins = Math.floor(secondsLeft / 60);
  let secs = secondsLeft % 60;

  if (mins < 10) mins = '0' + mins;
  if (secs < 10) secs = '0' + secs;

  document.getElementById('timerDisplay').textContent = mins + ':' + secs;

  // also update the label to match saved state
  if (isStudying) {
    document.getElementById('timerLabel').textContent = 'Study Session (25 min)';
  } else {
    document.getElementById('timerLabel').textContent = 'Break Time (5 min)';
  }
}


function startTimer() {
  if (timerRunning) return;
  timerRunning = true;

  timerInterval = setInterval(function() {
    secondsLeft--;
    saveTimer(); // save every second so refresh keeps the time
    updateTimerDisplay();


    //// put this at the top of your file
const timerSound = new Audio('https://www.soundjay.com/buttons/sounds/button-09a.mp3');
//Add your audio later

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;

  timerSound.play();
    
      if (isStudying) {
        alert('WELL DONE, Study session done!  Pls take a 5 minute break ');
        isStudying  = false;
        secondsLeft = 5 * 60;
      } else {
        alert('Break over! Time to study again ');
        isStudying  = true;
        secondsLeft = 25 * 60;
      }

      saveTimer();
      updateTimerDisplay();
    }

  }, 1000);
}


function pauseTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  saveTimer(); // save where it stopped
}


function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  isStudying   = true;
  secondsLeft  = 25 * 60;
  saveTimer(); // save the reset state
  updateTimerDisplay();
}


// 
// LIGHT andd DARK MODE
// 

function toggleTheme() {
  document.body.classList.toggle('dark');

  let btn    = document.querySelector('#topbar button');
  let isDark = document.body.classList.contains('dark');

  btn.textContent = isDark ? ' Light Mode' : ' Dark Mode';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  document.querySelector('#topbar button').textContent = ' Light Mode';
}

//
// START  runs when the page loads...
// 

showTasks();
updateTimerDisplay(); // shows thesaved time, not always 25:00