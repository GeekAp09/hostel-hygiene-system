const express = require('express')
const User = require('../models/users')
const router = new express.Router()

router.post('/users', async (req, res)=>{
    console.log(req.body)
    try{
        const user = new User(req.body)
        await user.save()
        res.status(201).send(user)
    
    }
    catch(error){
        console.log(error)
        res.status(400).send(error)
    }
    
})

router.get('/users', async (req, res)=>{

    try{
        const users = await User.find({})
        res.status(200).send(users)
    }
    catch(e){
        res.status(500).send(e)
    }

})

router.get('/users/:id', async (req, res)=>{
    
    const updates = Object.keys(req.body)
    const id = req.params.id

    try{

        const user = await User.findById(req.params.id)
        updates.forEach((update)=>{
            user[update] = req.body[update]
        })
      
        await user.save()

        // const user = await User.findById(id)
            if(!user){
                return res.status(404).send()
            }
            res.status(200).send(user)
    
    }
    catch(e){
        res.status(500).send(e);
    }
})

router.patch('/users/:id', async (req, res)=>{

    const id = req.params.id
    try{
        const user = await User.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}) // new: true returns the updated doc
        if(!user){
            res.status(401).send()
        }
        res.send(user)
    }
    catch(e){
        console.log(e)
        res.status(400).send()
    }

})

router.post('/users/login', async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    }
    catch(e){
        console.log(e)
        res.status(400).send(e)
    }

})

module.exports = router
