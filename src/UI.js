import addTask from './addTask'
import addProject from './addProject'
import taskClass from './taskClass'

export default class UI{

    static initButtons(){
        UI.initCloseModal()
        UI.initSubmitTask()
        UI.initSubmitEdit()
        UI.initAddProject()
        UI.initHomeButton()
        UI.initTodayButton()
        UI.initWeekButton()
        UI.populateProjects()   
        document.querySelector('#home-button').click()
    }

    static initAddTask(){
        const addTaskButton = document.querySelector('#todo-list-add-button')
        addTaskButton.addEventListener('click', ()=>{
            UI.openModal()
        })
    }

    static initCloseModal(){
        const overlay = document.querySelector('#overlay')
        overlay.addEventListener('click', ()=>{
            UI.closeModal('.addModal.active')
            UI.closeModal('.editModal.active')
        })

        document.addEventListener('keydown', (event) => {
            if (event.key == 'Escape'){
                UI.closeModal('.addModal.active')
                UI.closeModal('.editModal.active')
            } 
        })
    }

    static openModal(){
        const addModal = document.querySelector('.addModal')
        const overlay = document.querySelector('#overlay')
        if(addModal == null) return
        addModal.classList.add('active')
        overlay.classList.add('active')

        addModal.querySelector('#add-date-input').value = new Date().toJSON().slice(0, 10)
    }

    static openEditModal(name){
        const editModal = document.querySelector('.editModal')
        const overlay = document.querySelector('#overlay')
        if(editModal == null) return
        editModal.classList.add('active')
        overlay.classList.add('active')
        editModal.querySelector('h2').textContent = 'Edit ' + name

        UI.setEditValues(editModal, name)
    }

    static closeModal(modal){
        const addModal = document.querySelector(modal)
        const overlay = document.querySelector('#overlay')
        if(addModal == null) return
        addModal.classList.remove('active')
        overlay.classList.remove('active')
        addModal.reset()
    }

    static setEditValues(editModal, title){
        const main = document.querySelector('#main')
        let name = main.querySelector('h1').textContent
        if(name === 'Today' || name === 'Week'){
            name = 'Home'
        }
        let array = JSON.parse(localStorage.getItem(name))

        for(let i = 0; i < array.length; i++){
            if(array[i].name === title){
                editModal.querySelector('#edit-title-input').value = array[i].name
                editModal.querySelector('#edit-date-input').value = array[i].dueDate

                if(array[i].priority === 'low'){
                    editModal.querySelector('#edit-low-priority').click()
                }
                else if(array[i].priority === 'mid'){
                    editModal.querySelector('#edit-med-priority').click()
                }
                else{
                    editModal.querySelector('#edit-high-priority').click()
                }
                break
            }
        }
    }

    //TODO-ITEM
    //TODO-ITEM
    //TODO-ITEM

    static initSubmitTask(){
        const addModal = document.querySelector('#add-Modal')
        addModal.addEventListener('submit', (e) => {
            e.preventDefault()
            if(!addTask.addTaskToDOM()) return
            UI.closeModal('.addModal.active')
        })
    }

    static initSubmitEdit(){
        const editModal = document.querySelector('#edit-Modal')
        editModal.addEventListener('submit', (e)=>{
            e.preventDefault()
            if(!addTask.editTaskInDOM(editModal.querySelector('h2').textContent.slice(5))) return
            UI.closeModal('.editModal.active')
        })
    }

    static initGarbage(garbage){
        garbage.addEventListener('click', ()=>{
            garbage.parentElement.parentElement.remove()
            addTask.removeFromLocalStorage(garbage.parentElement.previousSibling.textContent)
        })
    }

    static initEdit(edit){
        edit.addEventListener('click', ()=>{
            UI.openEditModal(edit.parentElement.previousSibling.textContent)
        })
    }

    static initCheckBox(checkBox){
        checkBox.addEventListener('click', ()=>{
            if(checkBox.id == 'checkbox'){
                checkBox.id = 'checkbox-checked'
                let img = document.createElement('img')
                img.id = 'checkbox-img'
                img.src = './img/check.png'
                checkBox.appendChild(img)
                checkBox.nextSibling.innerHTML = '<s>' + checkBox.nextSibling.textContent + '</s>'
                addTask.changeDone(checkBox.nextSibling.textContent, true)
            }
            else{
                checkBox.id = 'checkbox'
                checkBox.innerHTML = ''
                checkBox.nextSibling.innerHTML = checkBox.nextSibling.textContent
                addTask.changeDone(checkBox.nextSibling.textContent, false)
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
            this.changeButtonColors(addProject)
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
            if(!addProject.addProjectToDOM()) return 
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
        input.maxLength = 10;
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
        if(addProject == null) return
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
            button.previousSibling.style.visibility = 'visible'
        })
        button.addEventListener('mouseout', ()=>{            
            button.previousSibling.style.visibility = 'hidden'
            if(!button.classList.contains('selected')){
                button.style.backgroundImage = ''
            }
        })
        
        button.addEventListener('click', ()=>{
            this.changeButtonColors(button)
            UI.closeAddProject()
            UI.setMainDivProject(button.querySelector('span'))
        })
    }    

    static initProjectButtonX(button){
        button.addEventListener('mouseover', ()=>{
            button.style.visibility = 'visible'
            button.nextSibling.style.backgroundImage = 'linear-gradient(rgb(0 0 0/15%) 0 0)'
        })

        button.addEventListener('click', ()=>{
            addProject.removeFromLocalStorage(button.nextSibling.querySelector('span').textContent)
            button.parentElement.remove()
            document.querySelector('#main').innerHTML = ''
        })
    }

    //Side-Bar
    //Side-Bar
    //Side-Bar

    static initHomeButton(){
        const home = document.querySelector('#home-button')
        home.addEventListener('click', ()=>{
            this.changeButtonColors(home)
            UI.closeAddProject()
            UI.setMainDivHome()
        })
    }

    static initTodayButton(){
        const today = document.querySelector('#today-button')
        today.addEventListener('click', ()=>{
            this.changeButtonColors(today)
            UI.closeAddProject()
            UI.setMainDivToday()
        })
    }

    static initWeekButton(){
        const week = document.querySelector('#week-button')
        week.addEventListener('click', ()=>{
            this.changeButtonColors(week)
            UI.closeAddProject()
            UI.setMainDivWeek()
        })
    }
    
    static changeButtonColors(button){
        let buttons = document.querySelectorAll('.side-bar-button')
        for(const btn of buttons){
            btn.style.backgroundImage = null
            btn.classList.remove('selected')
        }

        button.style.backgroundImage = 'linear-gradient(rgb(0 0 0/15%) 0 0)'
        button.classList.add('selected')
    }

    static setMainDivHome(){
        const main = document.querySelector('#main')
        main.innerHTML = ''

        var h1 = document.createElement("h1");
        h1.textContent = "Home";

        var button = document.createElement("button");
        button.setAttribute("id", "todo-list-add-button");
        var span = document.createElement("span");
        span.setAttribute("id", "todo-list-add-button-plus");
        span.textContent = "+";
        button.appendChild(span);
        button.appendChild(document.createTextNode("Add Task"));

        var div = document.createElement("div");
        div.setAttribute("id", "todo-items-container");

        main.appendChild(h1);
        main.appendChild(button);
        main.appendChild(div);        
        UI.initAddTask()
        UI.populateMainDiv(h1.textContent)
    }

    static setMainDivToday(){
        const main = document.querySelector('#main')
        main.innerHTML = ''

        var h1 = document.createElement("h1");
        h1.textContent = "Today";

        var div = document.createElement("div");
        div.setAttribute("id", "todo-items-container");

        main.appendChild(h1);
        main.appendChild(div);
        UI.populateMainDivToday()
    }

    static setMainDivWeek(){
        const main = document.querySelector('#main')
        main.innerHTML = ''

        var h1 = document.createElement("h1");
        h1.textContent = "Week";

        var div = document.createElement("div");
        div.setAttribute("id", "todo-items-container");

        main.appendChild(h1);
        main.appendChild(div);
        UI.populateMainDivWeek()
    }

    static setMainDivProject(project){
        const main = document.querySelector('#main')
        main.innerHTML = ''

        var h1 = document.createElement("h1");
        h1.textContent = project.textContent;

        var button = document.createElement("button");
        button.setAttribute("id", "todo-list-add-button");
        var span = document.createElement("span");
        span.setAttribute("id", "todo-list-add-button-plus");
        span.textContent = "+";
        button.appendChild(span);
        button.appendChild(document.createTextNode("Add Task"));

        var div = document.createElement("div");
        div.setAttribute("id", "todo-items-container");

        main.appendChild(h1);
        main.appendChild(button);
        main.appendChild(div);
        UI.initAddTask()
        UI.populateMainDiv(h1.textContent)
    }

    static populateMainDiv(name){
        const container = document.querySelector('#todo-items-container')
        container.innerHTML = ''

        let array = JSON.parse(localStorage.getItem(name))
        if(array === null) return 
        for(let i = 0; i < array.length; i++){
            addTask.createTaskElement(new taskClass(array[i]))
        }
    }

    static populateMainDivToday(){
        const container = document.querySelector('#todo-items-container')
        container.innerHTML = ''

        let array = JSON.parse(localStorage.getItem('Home'))
        if(array === null) return 
        let date = new Date().toJSON().slice(0, 10)

        for(let i = 0; i < array.length; i++){
            if(array[i].dueDate === date){
                addTask.createTaskElement(new taskClass(array[i]))
            }
        }
    }

    static populateMainDivWeek(){
        const container = document.querySelector('#todo-items-container')
        container.innerHTML = ''

        let array = JSON.parse(localStorage.getItem('Home'))
        if(array === null) return 
        let date = new Date()
        let dateArray = []

        while(date.getDay() !== 0){
            date.setDate(date.getDate() - 1)
        }
        
        while(date.getDay() <= 6){
            dateArray.push(date.toJSON().slice(0, 10))
            if(date.getDay() === 6) break
            date.setDate(date.getDate() + 1)
        }

        for(let i = 0; i < array.length; i++){
            for(let j = 0; j < dateArray.length; j++){
                if(array[i].dueDate === dateArray[j]){
                    addTask.createTaskElement(new taskClass(array[i]))
                }
            }
        }
    }

    static populateProjects(){
        const project = document.querySelector('#add-project-button')
        project.remove()

        for(let i = 0; i < localStorage.length; i++){
            const x = localStorage.key(i)
            if(x !== 'Home'){
                addProject.createProjectElement(x)
            }
        }

        UI.createAddProjectButton()
    }
}