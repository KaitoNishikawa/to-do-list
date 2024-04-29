import UI from './UI'

export default class addProject{
    static addProjectToDOM(){
        const value = this.getSubmitValue()
        this.createProjectElement(value)
    }

    static getSubmitValue(){
        const name = document.querySelector('#name-input')
        return name.value
    }

    static createProjectElement(value){
        const container = document.querySelector('#project-container')

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

        var spanElement = document.createElement("span");
        spanElement.classList.add("project-button-x");
        spanElement.textContent = "\u00D7";

        buttonElement.appendChild(spanElement);
        UI.initProjectButton(buttonElement)
        container.appendChild(buttonElement)
    }
}