<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Study Planner</title>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/smartstudy.css" />
</head>
<body>

  <!-- top-->
  <div id="topbar">
    <h1><strong>Study Planner</strong></h1>

    <button onclick="toggleTheme()"> Dark Mode</button>
  </div>
  <img
    src="images/98371-green_palm_tree_on_brown_sand_near_body_of_water_during_daytime-7680x4320.jpg"
    id="heroImg"
    alt="image">

  <!-- progress -->
  <div id="progressArea">
    <p>Tasks completed: <span id="progressText">0 of 0</span></p>
    <div id="progressBar">
      <div id="progressFill"></div>
    </div>
  </div>

  <!-- timer -->
  <div id="timerBox">
    <h2>⏱ Pomodoro Timer</h2>
    <p id="timerLabel">Study Session = (25 min)</p>
    <div id="timerDisplay">25:00</div>
    <div id="timerButtons">
      <button onclick="startTimer()">▶ Start</button>
      <button onclick="pauseTimer()">⏸ Pause</button>
      <button onclick="resetTimer()">🔄 Reset</button>
    </div>
  </div>

  <!-- add task form -->
  <div id="formBox">
    <h2>➕ Add a Task</h2>
    <input  type="text" id="subjectInput"  placeholder="Subject e.g. Mathematics" /><br/>
    <textarea id="descInput" placeholder="What do you need to do?"></textarea><br/>
    <input  type="date" id="deadlineInput" /><br/>
    <button onclick="addTask()">Add Task</button>
  </div>

  <!-- task list -->
  <div id="taskBox">
    <h2>📝 My Tasks</h2>
    <div id="taskList"></div>
  </div>

  <script src="js/smartstudy.js"></script>
</body>
</html>