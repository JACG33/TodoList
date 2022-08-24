
import { DB } from "./models/indb.js";
import { ui } from "./models/UI.js";

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    loadTask()
  }, 1500);
})

const db = new DB();
let data
let lastId
const todoText = document.getElementById('todoText')

const todoBtn = document.getElementById('todoBtn').addEventListener('click', () => {
  if (todoText.value != '') {
    db.agregar({ id: lastId + 1, task: todoText.value })
    list.append(ui.itemCreate(todoText.value, lastId + 1))
    lastId++
    todoText.value=''
  }
})

function loadTask() {
  const list = document.getElementById('list')
  list.innerHTML = '';
  data = db.getArr()
  if (data.length > 0) {
    data.map(ele => {
      list.append(ui.itemCreate(ele.task, ele.id))
      lastId=ele.id
    })
  } else {
    lastId = 0
  }
}

document.addEventListener('click', (e) => {
  const target = e.target;
  if (target.name == 'checkTodo') {
    target.checked = true
      target.disabled = true
      target.parentElement.parentElement.classList.add('list__item--complete')
      target.parentElement.parentElement.children[0].innerHTML+='<small></br>complete</small>'
      db.eliminar(Number(target.id));
  }
})

