import task from './JSONTask.js'
import taskClass from './taskClass.js'
import UI from './UI.js'

export default class addTask{
    static addTaskToDOM(){
        const values = this.getSubmitValuesAdd()
        if(!this.addToLocalStorage(values)) return false
        this.createTaskElement(new taskClass(values))
        return true
    }

    static editTaskInDOM(oldName){
        const main = document.querySelector('#main')
        const name = main.querySelector('h1').textContent

        const values = this.getSubmitValuesEdit()
        if(!this.editLocalStorage(values, oldName, name)) return false
        if(name === 'Today'){
            UI.populateMainDivToday()
        }
        else if(name === 'Week'){
            UI.populateMainDivWeek()
        }
        else{
            UI.populateMainDiv(name)
        }
        
        return true
    }

    static getSubmitValuesAdd(){
        const addModal = document.querySelector('#add-Modal')
        const title = addModal.querySelector('#add-title-input')
        const date = addModal.querySelector('#add-date-input')
        let radio = addModal.querySelectorAll('.radio-buttons')

        for(let i = 0; i < radio.length; i++){
            if (radio[i].checked){
                radio = radio[i]
                break
            }
        }

        return new task(title.value, date.value, radio.value, false)
    }

    static getSubmitValuesEdit(){
        const addModal = document.querySelector('#edit-Modal')
        const title = addModal.querySelector('#edit-title-input')
        const date = addModal.querySelector('#edit-date-input')
        let radio = addModal.querySelectorAll('.radio-buttons')

        for(let i = 0; i < radio.length; i++){
            if (radio[i].checked){
                radio = radio[i]
                break
            }
        }

        return new task(title.value, date.value, radio.value, false)
    }

    static checkIfLegal(task, array){
        if(array === null) return true
        for(let i = 0; i < array.length; i++){
            if(array[i].name === task.name){
                return false
            } 
        }
        return true
    }

    static addToLocalStorage(values){        
        const main = document.querySelector('#main')
        const name = main.querySelector('h1').textContent

        if(localStorage.getItem(name) === null){
            localStorage.setItem(name, JSON.stringify([]))
        }

        let array = JSON.parse(localStorage.getItem(name))
        if(!this.checkIfLegal(values, array)){
            alert('this name already exists')
            return false
        }
        array.push(values)
        localStorage.setItem(name, JSON.stringify(array))
        return true
    }

    static editLocalStorage(values, oldName, name){
        if(name === 'Week' || name === 'Today'){
            name = 'Home'
        }
        let array = JSON.parse(localStorage.getItem(name))
        if(!this.checkIfLegal(values, array) && values.name !== oldName){
            alert('this name already exists')
            return false
        }

        for(let i = 0; i < array.length; i++){
            if(array[i].name === oldName){
                array[i].name = values.name
                array[i].dueDate = values.dueDate
                array[i].priority = values.priority
                break
            }
        }

        localStorage.setItem(name, JSON.stringify(array))
        return true
    }

    static removeFromLocalStorage(taskName){
        const main = document.querySelector('#main')
        const name = main.querySelector('h1').textContent

        let array = JSON.parse(localStorage.getItem(name))
        for(let i = 0; i < array.length; i++){
            if(array[i].name === taskName){
                array.splice(i, 1)
                break
            }
        }
        localStorage.setItem(name, JSON.stringify(array))
    }

    static changeDone(taskName, bool){
        const main = document.querySelector('#main')
        let name = main.querySelector('h1').textContent
        if(name === 'Today' || name === 'Week'){
            name = 'Home'
        }
        
        let array = JSON.parse(localStorage.getItem(name))
        for(let i = 0; i < array.length; i++){
            if(array[i].name === taskName){
                array[i].done = bool
                break
            }
        }
        localStorage.setItem(name, JSON.stringify(array))
    }

    static createTaskElement(task){
        const container = document.querySelector('#todo-items-container')
        
        let todoItem = document.createElement('div')
        todoItem.classList.add('todo-item')

        let colorBar = document.createElement('div')
        colorBar.classList.add('color-bar')
        colorBar.style.backgroundColor = task.priorityColor()

        let checkBox = document.createElement('div')
        if(task.done){
            checkBox.id = 'checkbox'            
        }
        else{            
            checkBox.id = 'checkbox-checked'
        }        

        let title = document.createElement('span')
        title.id = 'todo-item-title'
        title.textContent = task.name

        let todoRight = document.createElement('span')
        todoRight.id = 'todo-item-right'

        let date = document.createElement('span')
        date.classList.add('todo-item-date')
        date.textContent = task.formattedDate()
        todoRight.appendChild(date)

        let editImg = document.createElement('img')
        editImg.src = './img/edit.png'
        editImg.classList.add('todo-item-img')
        UI.initEdit(editImg)
        todoRight.appendChild(editImg)

        let trashImg = document.createElement('img')
        trashImg.src = './img/trash.png'
        trashImg.classList.add('todo-item-img')
        UI.initGarbage(trashImg)
        todoRight.appendChild(trashImg)

        todoItem.appendChild(colorBar)
        todoItem.appendChild(checkBox)
        todoItem.appendChild(title)
        todoItem.appendChild(todoRight)
        
        UI.initCheckBox(checkBox)
        checkBox.click()
        
        container.appendChild(todoItem)
    }
}