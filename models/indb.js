export class DB {
  indb = indexedDB.open('todoList', 1);
  db
  arr
  constructor() {
    this.indb.addEventListener('upgradeneeded', (e) => {
      this.db = this.indb.result;
      if (!this.db.objectStoreNames.contains('task')) {
        this.db.createObjectStore('task', {
          keyPath: 'id'
        })
      }
    })

    this.indb.addEventListener('success', () => {
      this.db = this.indb.result;
      this.consultar();
    })

    this.indb.addEventListener('error', () => {
    })
  }
  setArr(array) {
    this.arr = array
  }
  getArr() {
    return this.arr
  }
  consultar() {
    const coneleccionObj = this.setTransaccion('readonly')
    const request = coneleccionObj.getAll();
    request.addEventListener('success', () => {
      this.setArr(request.result)
    })
    return this.getArr()
  }

  /**
   *
   * @param {object} data Recibe un objeto tipo JSON {id:number,task:'string'}
   */
  agregar(data) {
    const coneleccionObj = this.setTransaccion('readwrite')
    const request = coneleccionObj.add(data)
    request.addEventListener('complete', () => {
    })
  }

  /**
   *
   * @param {number} data Numero del id del elemento
   */
  obtener(data) {
    const coneleccionObj = this.setTransaccion('readonly')
    const request = coneleccionObj.get(data)

    request.addEventListener('success', (e) => {
    })
  }

  /**
   *
   * @param {object} data Recibe un objeto tipo JSON {id:number,task:'string'}
   */
  actualizar(data) {
    const coneleccionObj = this.setTransaccion('readwrite')
    const request = coneleccionObj.put(data)

    request.addEventListener('success', (e) => {
    })
  }

  /**
   *
   * @param {number} data Recibe un numero que es el id del elemento
   */
  eliminar(data) {
    const coneleccionObj = this.setTransaccion('readwrite')
    const request = coneleccionObj.delete(data)

    request.addEventListener('success', (e) => {
      return true
    })
  }
  /**
   * 
   * @param {string} type Tipo de transaccion a ejecutar (Puede ser readwrite o readonly)
   */
   setTransaccion(type) {
    const transaccion = this.db.transaction('task', type)
    const coneleccionObj = transaccion.objectStore('task')
    return coneleccionObj;
  }
}