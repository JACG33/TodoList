class UI {
  /**
   * 
   * @param {string} texto Texto para crear el item
   * @returns Devuelve el item dentro de un contenedor
   */
  itemCreate(texto, num = null) {
    const listItem = document.createElement('div');
    listItem.className = 'list__item';
    const span = document.createElement('span');
    const label = document.createElement('label');
    const check = document.createElement('input');
    const divlbl = document.createElement('div')
    label.className = 'lbl__check'
    check.className = 'list__check hidden-xs-up'
    check.type = 'checkbox'
    check.name = 'checkTodo'
    check.id = num
    divlbl.className='lbl__check__div'
    span.innerText = texto
    label.append(check)
    label.append(divlbl)
    listItem.append(span)
    listItem.append(label)

    return listItem;
  }
}

export const ui = new UI();