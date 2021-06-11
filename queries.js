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

    isEmpty() {
        return this.count === 0;
    };

    pop() {
        this.count = this.count -1;
        return this.items.pop();
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
        }
    }
});

const postMessageStack = async (request, response) => {
    const { data, agentid, structureid } = request.body

    pool.query(`INSERT INTO agent (data, agentid, structureid) VALUES ($1, $2, $3)`, [data, agentid, structureid], (error, results) => {
        if (error) throw error;
        response.status(201).json("An agent order has successfully been created!");
    })
};

const getMessageStack = (request, response) => {
    const { agentid, structureid } = request.body
    
    pool.query('SELECT data, agentid, structureid FROM agent WHERE agentid = $1 AND structureid = $2', [agentid, structureid], (error, results) => {
        if (error) throw error;
        let stackInfo = stack.pop()
        response.status(200).json(`Hello agent! These are your orders:  ${stackInfo.data}`);
        console.log(`Hello agent! These are your orders:  ${stackInfo.data}`)
    });
};

class Queue {
    constructor() {
        this.count = 0;
        this.lowestCount = 0
        this.items = {};
    }

    isEmpty() {
        return this.count - this.lowestCount === 0;
    }
    
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
        
    };

    enqueue(element) {
        this.items[this.count] = element;
        this.count++;
    };

};

let queue = new Queue()

    pool.query('SELECT * FROM agent', function (err, results) {
        if (err){
            console.log(err);
        } else {
            var i;
            for ( i = 0; i < results.rowCount;i++){
                queue.enqueue(results.rows[i]);
            }
        }
    })
    const getMessageQueue = (request, response) => {
        const { agentid, structureid } = request.body
        
        pool.query('SELECT data, agentid, structureid FROM agent WHERE agentid = $1 AND structureid = $2', [agentid, structureid], (error, results) => {
            if (error) throw error;
            let queueInfo = queue.dequeue()
            response.status(200).json(`Hello agent! These are your orders:  ${queueInfo.data}`);
            console.log(`Hello agent! These are your orders:  ${queueInfo.data}`)
        });
    };

    const getMessagesByAgentId = (request, response) => { 
        const { agentid } = request.body
           
        pool.query('SELECT data FROM agent WHERE agentid = $1', [agentid], (error, results) => {
            if (error) throw error;
            
            response.status(200).json(results.rows);   
            console.log("Hello agent! These are your orders")
            console.log(results.rows)
        });
    };

   

module.exports = {
    postMessageStack,
    getMessageStack,
    getMessageQueue,
    getMessagesByAgentId
};
