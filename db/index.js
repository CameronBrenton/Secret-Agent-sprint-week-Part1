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

stack.push(100)
stack.push(150)
stack.push(200)