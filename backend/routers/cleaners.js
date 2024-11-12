const express = require('express')
const Hostler = require('../models/hostlers')
const ToClean = require('../models/CleaningRecord')
const Cleaner = require('../models/staff')

const route = new express.Router()


route.post('/cleanerlogin', async (req, res)=>{

    try{
    console.log(req.body)
    const cleaner = await Cleaner.findByCredentials(req.body.cleanerid, req.body.password)
    // req.session.cleanerid = cleaner.cleanerid
    
    res.send(cleaner)

    }
    catch(e){
        console.log(e)
        res.status(400).send({error: e.message})
    }
})

route.post('/NeededToClean', async (req, res)=>{

    try{
        const {cleanerid} = req.body
        console.log(cleanerid)
        const cleaner = await Cleaner.findOne({cleanerid})
    
        if(!cleaner){
            throw new Error("no cleaner found")
        }
    
        const dirtyrooms = await ToClean.find({hostel: cleaner.hostel, completed: false})
        res.send(dirtyrooms)
    
    }
    catch(e){
        res.send(e)
    }
})

route.post('/cleanerchangepass', async (req, res)=>{
    
    const oldPass = req.body.oldpass

try{

    const cleaner = await Cleaner.findByCredentials(req.body.cleanerid, req.body.oldpass)
    cleaner.password = req.body.newpass
    console.log(cleaner)    
    await cleaner.save()

    res.status(200).send(cleaner)

}
catch(e){

    res.status(400).send({error: e.message})

}

})


module.exports = route
