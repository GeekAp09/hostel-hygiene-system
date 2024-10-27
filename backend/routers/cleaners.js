const express = require('express')
const Hostler = require('../models/hostlers')
const ToClean = require('../models/CleaningRecord')
const Cleaner = require('../models/cleaners')

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
        res.send(e)
    }
})

route.get('/NeededToClean', async (req, res)=>{

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

module.exports = route
