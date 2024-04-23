export default class UI{
    static loadHomepage() {
        console.log('hello')
        UI.initButtons()
    }

    static initButtons(){
        console.log('world')
        UI.initAddTask()
    }

    static initAddTask(){
        const addTaskButton = document.querySelector('#todo-list-add-button')
        addTaskButton.addEventListener('click', this.openAddModal)
    }

    static openAddModal(){
        const addModal = document.querySelector('#add-Modal')
        const overlay = document.querySelector('#overlay')
        // if(addModal == null) return
        console.log(addModal)
        console.log(overlay)
        addModal.classList.add('active')
        overlay.classList.add('active')
    }
}