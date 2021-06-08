const Pool = require('pg').Pool

const pool = new Pool({
    user: 'sprint',
    host: 'localhost',
    database: "sprintDatabase",
    password: "password",
    port: 5432
});


const createUser = async (request, response) => {
    const {data, agentid, structureid} = request.body
    
    //stack.push(.....)

    pool.query('INSERT INTO agent (data, agentid, structureid) VALUES ($1, $2, $3)',[data, agentid, structureid], (error, results) => {
        if (error) throw error;
        response.status(201).json("A user has successfully been created!");
    });
};






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
data: "New Data",
agentid : '4',
structureid : '6'

})

module.exports = {
    Stack,
    createUser
};
