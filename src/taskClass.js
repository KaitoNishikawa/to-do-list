export default class taskClass{
    constructor(task){
        this.name = task.name
        this.dueDate = task.dueDate
        this.priority = task.priority
        this.done = task.done
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