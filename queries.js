const Pool = require('pg').Pool

const pool = new Pool({
    user: 'sprint',
    host: 'localhost',
    database: "sprintDatabase",
    password: "password",
    port: 5432
});

let top = -1

class Stack{
    constructor() {
        this.items = []
        this.count = 0
        
    }

    /*pop() {
        if ( this.count == 0 )
            print( "Stack is empty!" )
        else
            top = top - 1
            
    };*/

    isEmpty() {
        return this.count === 0;
    };


    pop() {
        this.count = this.count -1;
        return this.items.pop(); // removes the last element
    }

    push(element) {
        this.items[this.count] = element
        console.log(`${element} added to ${this.count}`)
        this.count += 1
        return this.count - 1
    };
    

};

const stack = new Stack()


pool.query('SELECT * FROM agent', function (err, results) {
    if (err){
        console.log(err);
    } else {
        var i;
        for ( i = 0; i < results.rowCount;i++){
            stack.push(results.rows[i]);
            console.log(stack)
        }
        /*stack.push(results.rows)
        console.log(results.rows[0])*/
        

    }
});

const postAgent = async (request, response) => {
    const { data, agentid, structureid } = request.body

    pool.query(`INSERT INTO agent (data, agentid, structureid) VALUES ($1, $2, $3)`, [data, agentid, structureid], (error, results) => {
        if (error) throw error;
        response.status(201).json("An agent:message has successfully been created!");
        console.log(stack)
 
    })
};

const getAgent = (request, response) => {
    const { agentid, structureid } = request.body
    
    pool.query('SELECT * FROM agent WHERE agentid = $1, structureid = $2', [agentid, structureid], () => {
        stack.pop()
        response.status(200).json(`An agent:message has successfully been retrieved the data was:`);
        console.log(stack)
        console.log(stack.pop())
    });
};




module.exports = {
    postAgent,
    getAgent
};
