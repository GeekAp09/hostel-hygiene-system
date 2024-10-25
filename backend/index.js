const express = require('express')
const app = express()

require('./mongoose')
const User = require('./models/users')
const Task = require('./models/tasks')

const UserRouter = require('./routers/users')
const TaskRouter = require('./routers/tasks')


app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)


app.listen(3000, ()=>{
    console.log('server is listening')
})

const bcrypt = require('bcrypt')

const myfunction = async ()=>{
    const password = "1234"
    const hashedpassword = await bcrypt.hash(password, 8)
    console.log(password)
    console.log(hashedpassword)

    const isMatch = await bcrypt.compare('1234', hashedpassword)
    console.log(isMatch)

}

myfunction()