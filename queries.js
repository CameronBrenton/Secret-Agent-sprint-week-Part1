const Pool = require('pg').Pool

const pool = new Pool({
    user: 'sprint',
    host: 'localhost',
    database: "sprintDatabase",
    password: "password",
    port: 5432
});








class Stack{
    constructor() {
        this.items = []
        this.count = 0
    }


push(element) {
    this.items[this.count] = element
    console.log(`${element} added to ${this.count}`)
    this.count += 1
    return this.count - 1
    
    } 
}

const stack = new Stack()

stack.push({ 
Data : "Insert Data",
AgentId : '1',
StructureId: '1',

})


