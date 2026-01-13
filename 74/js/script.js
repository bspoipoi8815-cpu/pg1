const input = document.getElementById("weightInput");
const button = document.getElementById("record");
const list = document.getElementById("list");
const count = document.getElementById("count"); 

let weight = [];

function saveData() {
  localStorage.setItem("weightData", JSON.stringify(weight));
}

function updateCount() {
  count.textContent = "記録件数：" + weight.length + "件";
}

function renderList() {
  list.innerHTML = "";

  weight.forEach(function (value, index) {
    const li = document.createElement("li");

    const text = document.createElement("span");
    text.textContent = value;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";

    deleteBtn.addEventListener("click", function () {
      weight.splice(index, 1);
      saveData();
      renderList();
    });

    li.appendChild(text);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  updateCount();
}

button.addEventListener("click", function () {
  const value = input.value;

  if (value === "") {
    return;
  }

  const now = new Date();
  const record =
    (now.getMonth() + 1) + "/" +
    now.getDate() + " " +
    now.getHours().toString().padStart(2, "0") + ":" +
    now.getMinutes().toString().padStart(2, "0") +
    "　" + value;

  weight.push(record);
  console.log(weight);


  saveData();    
  renderList();   

  input.value = "";
});

window.addEventListener("load", function () {
  const saved = localStorage.getItem("weightData");

  if (saved !== null) {
    weight = JSON.parse(saved);
  }

  renderList(); 
});
