const Pool = require('pg').Pool

const pool = new Pool({
    user: 'sprint',
    host: 'localhost',
    database: "sprintDatabase",
    password: "password",
    port: 5432
});

let dataArray = ['I am in!', 'Everything is green!', 'Victory is ours!', 'Hello agents!', 'Awaiting orders!']
let agentidArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
let structureidArray = [50,51,52,53,54,55,56,57,58,59,60]

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
    };
};

const postAgent = async (request, response) => {
    const { data, agentid, structureid } = request.body
    const stack = new Stack()
    stack.push({
        data: dataArray[Math.floor(Math.random() * dataArray.length)],
        agentid: agentidArray[Math.floor(Math.random() * agentidArray.length)],
        structureid: structureidArray[Math.floor(Math.random() * structureidArray.length)]
    })
    console.log(stack);

    pool.query(`INSERT INTO agent (data, agentid, structureid) VALUES ($1, $2, $3)`, [data, agentid, structureid], (error, results) => {
        if (error) throw error;
        response.status(201).json("An agent:message has successfully been created!");
 
    })
//
//const getAgent

};



module.exports = {
    postAgent,
};







