class UI {
  /**
   * 
   * @param {string} texto Texto para crear el item
   * @returns Devuelve el item dentro de un contenedor
   */
  itemCreate(texto, num = null, status = null) {
    const listItem = document.createElement('div');
    listItem.className = 'list__item';
    // 
    const div1 = document.createElement('div');
    // 
    const div2 = document.createElement('div');
    div2.className="rigth__contain"
    //
    const btndelte = document.createElement('button')
    btndelte.type = "button"
    btndelte.className="btn__delete"
    btndelte.textContent = "delete"
    btndelte.setAttribute("data-delete", "item")
    btndelte.id = num
    btndelte.hidden=true
    // 
    const span = document.createElement('span');
    span.setAttribute("data-task", "content")
    span.innerText = texto
    // 
    const label = document.createElement('label');
    label.className = 'lbl__check'
    // 
    const check = document.createElement('input');
    check.className = 'list__check hidden-xs-up'
    check.type = 'checkbox'
    check.name = 'checkTodo'
    check.id = num
    // 
    const divlbl = document.createElement('div')
    divlbl.className = 'lbl__check__div'

    if (status == "complete") {
      listItem.classList.add("list__item--complete")
      check.checked = true
      check.disabled = true
      btndelte.hidden=false
    }
    
    label.append(check)
    label.append(divlbl)
    
    div1.append(span)
    
    div2.append(btndelte)
    div2.append(label)

    listItem.append(div1)
    listItem.append(div2)

    return listItem;
  }
}

export const ui = new UI();