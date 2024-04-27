import _ from 'lodash'
import './styles/main-elements.css'
import './styles/side-bar.css'
import './styles/main.css'
import './styles/modal.css'
import UI from './UI.js'

// document.addEventListener("DOMContentLoaded", function(){
//     const addTaskButton = document.getElementById('todo-list-add-button')
//     const homeButton = document.getElementById('home-button')
//     homeButton.addEventListener("click", console.log('home'))
//     console.log(addTaskButton)
//     // addTaskButton.addEventListener('click', UI.openAddModal())
//     addTaskButton.addEventListener('click', console.log('hello'))
// });

document.addEventListener("DOMContentLoaded", UI.initButtons())


