import addTask from './addTask'
import task from './taskClass'

export default class UI{
    // static loadHomepage() {
    //     console.log('hello')
    //     UI.initButtons()
    // }

    static initButtons(){
        UI.initAddTask()
        UI.initCloseModal()
        UI.initSubmitTask()
        UI.initAddProject()
    }

    static initAddTask(){
        const addTaskButton = document.querySelector('#todo-list-add-button')
        addTaskButton.addEventListener('click', ()=>{
            console.log('click')
            UI.openAddModal()
        })
    }

    static initCloseModal(){
        const overlay = document.querySelector('#overlay')
        overlay.addEventListener('click', UI.closeAddModal)

        document.addEventListener('keydown', (event) => {
            if (event.key == 'Escape'){
                UI.closeAddModal()
            } 
        })
    }

    static initSubmitTask(){
        const addModal = document.querySelector('#add-Modal')
        addModal.addEventListener('submit', (e) => {
            e.preventDefault()
            addTask.addTaskToDOM()
            UI.closeAddModal()
        })
    }

    static initAddProject(){
        const addProject = document.querySelector('#add-project-button')
        addProject.addEventListener('click', ()=>{console.log('project')})
    }

    static initGarbage(garbage){
        garbage.addEventListener('click', ()=>{console.log('garbage')})
    }

    static initEdit(edit){
        edit.addEventListener('click', ()=>{console.log('edit')})
    }

    static initCheckBox(checkBox){
        checkBox.addEventListener('click', ()=>{
            console.log('check')
            if(checkBox.id == 'checkbox'){
                checkBox.id = 'checkbox-checked'
                let img = document.createElement('img')
                img.id = 'checkbox-img'
                img.src = './img/check.png'
                checkBox.appendChild(img)
            }
            else{
                checkBox.id = 'checkbox'
                checkBox.innerHTML = ''
            }
        })        
    }

    static openAddModal(){
        const addModal = document.querySelector('.addModal')
        const overlay = document.querySelector('#overlay')
        if(addModal == null) return
        addModal.classList.add('active')
        overlay.classList.add('active')
    }

    static closeAddModal(){
        const addModal = document.querySelector('.addModal.active')
        const overlay = document.querySelector('#overlay')
        if(addModal == null) return
        addModal.classList.remove('active')
        overlay.classList.remove('active')
        addModal.reset()
    }

   
}