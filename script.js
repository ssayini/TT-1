let todosData = []; // store todos in memory

async function loadTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=20");
  const todos = await response.json();

  todosData = todos.map(todo => {
    const creationDate = new Date(Date.now() - Math.random() * 10000000000);
    return {
      ...todo,
      creationDate: creationDate
    };
  });

  renderTable(todosData);
}

function renderTable(data) {
  const table = document.getElementById("todoTable");
  table.innerHTML = ""; // clear old rows

  data.forEach(todo => {
    const tr = document.createElement("tr");

    const dateText = todo.creationDate.toLocaleDateString();

    tr.innerHTML = `
      <td><input type="checkbox" ${todo.completed ? "checked" : ""}></td>
      <td>${todo.title}</td>
      <td>${dateText}</td>
      <td class="delete-btn"><img src="delete.png" class="trash-icon" alt="Delete"></td>
    `;

    tr.querySelector(".delete-btn").addEventListener("click", () => tr.remove());

    table.appendChild(tr);
  });
}

document.getElementById("searchBtn").addEventListener("click", () => {
  const startValue = document.getElementById("startDate").value;
  const endValue = document.getElementById("endDate").value;

  let filtered = todosData;

  if (startValue) {
    const start = new Date(startValue);
    filtered = filtered.filter(todo => todo.creationDate >= start);
  }

  if (endValue) {
    const end = new Date(endValue);
    filtered = filtered.filter(todo => todo.creationDate <= end);
  }

  renderTable(filtered);
});

loadTodos();
