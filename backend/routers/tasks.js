const express = require('express')
const Task = require('../models/tasks')

const router = new express.Router()

router.post('/task', async (req, res)=>{

    const task = new Task(req.body);

    try{
        await task.save()
        res.status(201).send(task)

    }
    catch(error){
        console.log(error)
        res.status(400).send(error)
    }

})


router.get('/tasks', async (req, res)=>{

    try{
        const Tasks = await Task.find({})
        res.status(200).send(Tasks)

    }
    catch(e){
        res.status(500).send(e)
    }

}) 

router.get('/tasks/:id', async (req, res)=>{
    const id = req.params.id
    try{
        const user = await Task.findById(id)
        if(!user){
            return res.status(404).send()
        }
        res.status(200).send(user)

    }
    catch(e){
        res.status(500).send(e);
    }
})

router.patch('/tasks/:id', async (req, res)=>{
    
    const updates = Object.keys(req.body)
    const id = req.params.id
    
    try{

        const task = await Task.findById(req.params.id)
        updates.forEach((update)=>{
            task[update] = req.body[update]
        })
      
        await task.save()

        // const task = await Task.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}) // new: true returns the updated doc
        if(!task){
            res.status(401).send()
        }
        res.send(task)
    }
    catch(e){
        console.log(e)
        res.status(400).send()
    }

})

module.exports = router