import addTask from './addTask'
import addProject from './addProject'

export default class UI{

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

    //TODO-ITEM
    //TODO-ITEM
    //TODO-ITEM

    static initSubmitTask(){
        const addModal = document.querySelector('#add-Modal')
        addModal.addEventListener('submit', (e) => {
            e.preventDefault()
            addTask.addTaskToDOM()
            UI.closeAddModal()
        })
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
                checkBox.nextSibling.innerHTML = '<s>' + checkBox.nextSibling.textContent + '</s>'
            }
            else{
                checkBox.id = 'checkbox'
                checkBox.innerHTML = ''
                checkBox.nextSibling.innerHTML = checkBox.nextSibling.textContent
            }
        })        
    }

    //PROJECT
    //PROJECT
    //PROJECT

    static initAddProject(){
        const addProject = document.querySelector('#add-project-button')
        addProject.addEventListener('click', ()=>{
            addProject.remove()
            UI.openAddProject()
            UI.initCancelProjectButton()
            UI.initAddProjectButton()
        })
    }

    static initCancelProjectButton(){
        const form = document.querySelector('#add-project-container')
        const cancelButton = document.querySelector('#project-cancel-button')
        cancelButton.addEventListener('click', ()=>{
            UI.closeAddProject()        
            form.reset()
        })
    }

    static initAddProjectButton(){
        const form = document.querySelector('#add-project-container')
        form.addEventListener('submit', (e)=>{
            e.preventDefault()         
            addProject.addProjectToDOM()
            UI.closeAddProject()
            form.reset()
        })
    }

    static openAddProject(){
        const sideBar = document.querySelector('#side-bar')

        let form = document.createElement('form');
        form.id = 'add-project-container';
        form.className = 'addProject';
        form.name = '';

        let input = document.createElement('input');
        input.type = 'text';
        input.name = 'name';
        input.id = 'name-input';
        input.placeholder = 'Project Name';
        input.maxLength = 20;
        input.required = true;

        let buttonsContainer = document.createElement('div');
        buttonsContainer.id = 'add-project-buttons-container';

        let addButton = document.createElement('button');
        addButton.id = 'project-add-button';
        addButton.className = 'add-project-buttons';
        addButton.type = 'submit';
        addButton.textContent = 'Add';

        let cancelButton = document.createElement('button');
        cancelButton.id = 'project-cancel-button';
        cancelButton.className = 'add-project-buttons';
        cancelButton.textContent = 'Cancel';

        buttonsContainer.appendChild(addButton);
        buttonsContainer.appendChild(cancelButton);

        form.appendChild(input);
        form.appendChild(buttonsContainer);

        sideBar.appendChild(form)
    }   

    static closeAddProject(){
        const addProject = document.querySelector('#add-project-container')
        addProject.remove()    
        UI.createAddProjectButton()
    }

    static createAddProjectButton(){
        const sideBar = document.querySelector('#side-bar')

        let button = document.createElement('button');
        button.className = 'side-bar-button';
        button.id = 'add-project-button';

        let span = document.createElement('span');
        span.id = 'project-add-button-plus';
        span.textContent = '+';

        button.appendChild(span);
        button.appendChild(document.createTextNode('Add Project'));

        sideBar.appendChild(button)
        UI.initAddProject()
    }

    static initProjectButton(button){
        button.addEventListener('mouseover', ()=>{
            button.querySelector('.project-button-x').style.visibility = 'visible'
        })
        button.addEventListener('mouseout', ()=>{            
            button.querySelector('.project-button-x').style.visibility = 'hidden'
        })
    }    
}