import task from './taskClass.js'
import UI from './UI.js'

export default class addTask{
    static addTaskToDOM(){
        const values = this.getSubmitValues()
        this.createTaskElement(values)
    }

    static getSubmitValues(){
        const title = document.querySelector('#title-input')
        const date = document.querySelector('#date-input')
        let radio = document.getElementsByName('priority')

        for(let i = 0; i < radio.length; i++){
            if (radio[i].checked){
                radio = radio[i]
                break
            }
        }

        return new task(title.value, date.value, radio.value)
    }

    static createTaskElement(task){
        const container = document.querySelector('#todo-items-container')
        // container.innerHTML += ` 
        // <div class="todo-item">
        //         <div class="color-bar" style="background-color:${task.priorityColor()}"></div>
        //         <div id="checkbox-checked"></div>
        //         <span class="todo-item-title">${task.getName()}</span>
        //         <span id="todo-item-right">
        //             <span class="todo-item-date">${task.formattedDate()}</span>
        //             <img src="./img/edit.png" id="editImg" class="todo-item-img">
        //             <img src="./img/trash.png" id="trashImg" class="todo-item-img">
        //         </span>                
        // </div>`
        let todoItem = document.createElement('div')
        todoItem.classList.add('todo-item')

        let colorBar = document.createElement('div')
        colorBar.classList.add('color-bar')
        colorBar.style.backgroundColor = task.priorityColor()

        let checkBox = document.createElement('div')
        checkBox.id = 'checkbox'
        UI.initCheckBox(checkBox)

        let title = document.createElement('span')
        title.id = 'todo-item-title'
        title.textContent = task.getName()

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
        
        container.appendChild(todoItem)
    }
}