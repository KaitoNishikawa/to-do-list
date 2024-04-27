export default class task{
    constructor(name, dueDate, priority){
        this.name = name
        this.dueDate = dueDate
        this.priority = priority
        this.done = false
    }

    setDoneTrue(){
        this.done = true
    }

    setDoneFalse(){
        this.done = false
    }

    getName(){
        return this.name
    }

    getDueDate(){
        return this.dueDate
    }

    getPriority(){
        return this.priority
    }

    formattedDate(){
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let date = this.dueDate.split('-')

        return months[date[1] - 1] + ' ' + date[2]
    }

    priorityColor(){
        if (this.priority === 'low') return '#25840e'
        else if (this.priority === 'mid') return '#fbab1c'
        return '#f41a1a'
    }
}