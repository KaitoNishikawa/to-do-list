import UI from './UI'

export default class addProject{
    static addProjectToDOM(){
        const value = this.getSubmitValue()   
        if(!this.checkIfLegal(value)) return false
        this.addToLocalStorage(value)
        this.createProjectElement(value)
        return true
    }

    static getSubmitValue(){
        const name = document.querySelector('#name-input')
        return name.value
    }

    static checkIfLegal(value){
        if(localStorage.getItem(value) !== null){
            if(value === 'Home'){
                alert('you cannot name a project "Home"')
                return false
            }
            else{
                alert('this project name is already in use')
                return false
            }
        }
        return true
    }

    static addToLocalStorage(value){
        localStorage.setItem(value, JSON.stringify([]))
    }

    static removeFromLocalStorage(value){
        localStorage.removeItem(value)
    }

    static createProjectElement(value){
        const container = document.querySelector('#project-container')

        var wrapper = document.createElement('div')
        wrapper.classList.add('project-button-wrapper')

        var buttonElement = document.createElement("button");
        buttonElement.classList.add("side-bar-button", "project-button");

        var imgElement = document.createElement("img");
        imgElement.src = "./img/list.png";
        imgElement.classList.add("side-bar-icons");
        imgElement.id = "list-icons";

        buttonElement.appendChild(imgElement);

        var text = document.createElement('span')
        text.textContent = value

        buttonElement.appendChild(text)

        var spanElement = document.createElement("button");
        spanElement.classList.add("project-button-x");
        spanElement.textContent = "\u00D7";

        wrapper.appendChild(spanElement);
        wrapper.appendChild(buttonElement)
        UI.initProjectButton(buttonElement)
        UI.initProjectButtonX(spanElement)
        container.appendChild(wrapper)
        buttonElement.click()
    }
}