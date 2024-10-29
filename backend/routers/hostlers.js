const express = require('express')
const Hostler = require('../models/hostlers')
const ToClean = require('../models/CleaningRecord')

const route = new express.Router()

route.post('/hostlerlogin', async (req, res)=>{

    try{

    console.log(req.body)
    const hostler = await Hostler.findByCredentials(req.body.rollnumber, req.body.password)
    
    res.send(hostler)

    }
    catch(e){
        console.log(e)
        res.status(400).send({error: e.message})
    }
})

// to raise Request
route.post('/CleaningRequest', async (req, res)=>{

    const { rollnumber } = req.body
    console.log(rollnumber)

try{

    const hostler = await Hostler.findOne({rollnumber})
    console.log(hostler)

    const PendingRequest = await ToClean.countDocuments({room: hostler.roomnumber, hostel: hostler.hostel, completed: false, request: req.body.request})
    console.log(PendingRequest)
    if(PendingRequest>0){
        throw new Error ("Request already submitted")
    }
    
    const newReq = new ToClean({request: req.body.request, room: hostler.roomnumber, hostel: hostler.hostel})
    await newReq.save()

    // console.log(newReq)
    res.status(200).send(newReq)

}
catch(e){

    console.log(e)
    res.status(400).send(e)

}
})

route.post('/FetchAllHostlerReq', async (req, res)=>{

const { rollnumber } = req.body

console.log(rollnumber)
try{
    const hostler = await Hostler.findOne({rollnumber})
    console.log(hostler)
    const requests = await ToClean.find({hostel: hostler.hostel, room: hostler.roomnumber}).sort({createdAt: -1})
    // console.log(requests)
    res.send(requests)
    
}

catch(e){

    console.log(e)
    res.send(e)

}
})


route.post('/Completed', async (req, res)=>{

    const rollnumber = req.body.rollnumber

try{
    const hostler = await Hostler.findOne({rollnumber})
    console.log(hostler)

    const request = await ToClean.findOne({room: hostler.roomnumber, hostel: hostler.hostel, completed: false, request: req.body.request})

    request.completed = true
    request.status = "Completed"

    await request.save()
    return res.send(request)
}
catch(e){
console.log(e)
return res.status(400).send({error: "No request exists"})
}

})

module.exports = route