
import { DB } from "./models/indb.js";
import { ui } from "./models/UI.js";


window.addEventListener('DOMContentLoaded', () => {
  const db = new DB();
  let data
  let lastId
  const todoText = document.getElementById('todoText')

  function loadTask() {
    const list = document.getElementById('list')
    list.innerHTML = '';
    data = db.getArr()
    if (data.length > 0) {
      data.map(ele => {
        list.append(ui.itemCreate(ele.task, ele.id, ele.status))
        lastId = ele.id
      })
    } else {
      lastId = 0
    }
  }

  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.name == 'checkTodo') {
      const task = target.closest(".list__item")
      const taskContent = task.querySelector("[data-task=content]").innerText
      task.querySelector("[data-delete]").hidden = false

      target.checked = true
      target.disabled = true
      task.classList.add('list__item--complete')
      db.actualizar({ id: Number(target.id), task: taskContent, status: "complete" })
    }

    if (target.closest("[data-delete]")) {
      db.eliminar(Number(target.id))
      target.closest(".list__item--complete").classList.add("list__item--deleted")
      setTimeout(() => {
        target.closest(".list__item--complete").remove()
      }, 200);
    }

  })

  document.querySelector(".form__area").addEventListener("submit", e => {
    e.preventDefault()
    if (todoText.value != '') {
      db.agregar({ id: lastId + 1, task: todoText.value, status: "pending" })
      list.append(ui.itemCreate(todoText.value, lastId + 1))
      lastId++
      todoText.value = ''
    }

  })

  setTimeout(() => {
    loadTask()
  }, 1500);

})  
