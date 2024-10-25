const express = require('express')
require('./mongoose/mongoose')

const Hostler = require('./models/hostlers')
const ToClean = require('./models/CleaningRecord')
const Cleaner = require('./models/cleaners')

const session = require('express-session')

const app = express()

app.use(express.json())
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 } // Session expires after 30 minutes
}));



// for Administrator pusrpose only
app.post('/newhostler', async (req, res)=>{

    console.log(req.body)
    
    try{
        const hostler = new Hostler(req.body)
        await hostler.save()
        res.status(200).send(hostler)
    }
    catch(e){
        console.log(e)
        res.send(e)
    }

})

app.post('/newcleaner', async (req, res)=>{

    console.log(req.body)

    try{
        const cleaner = new Cleaner(req.body)
        await cleaner.save()
        res.status(200).send(cleaner)
    }
    catch(e){
        console.log(e)
        res.send(e)
    }

})

// Main Endpoints ----

app.post('/hostlerlogin', async (req, res)=>{

    try{
    console.log(req.body)
    const hostler = await Hostler.findByCredentials(req.body.rollnumber, req.body.password)
    req.session.rollnumber = hostler.rollnumber
    
    res.send(hostler)

    }
    catch(e){
        console.log(e)
        res.send(e)
    }
})


app.post('/CleaningRequest', async (req, res)=>{

try{
    const newReq = new ToClean(req.body)
    await newReq.save()

    console.log(newReq)
    res.status(200).send(newReq)

}
catch(e){

    console.log(e)
    res.status(400).send(e)

}
})

app.get('/hostlerReq', async (req, res)=>{

const rollnumber = req.session.rollnumber
console.log(rollnumber)
try{
    const hostler = await Hostler.findOne({rollnumber})
    console.log(hostler)
    const requests = await ToClean.find({hostel: hostler.hostel, room: hostler.roomnumber})
    console.log(requests)
    res.send(requests)
    
}

catch(e){

    console.log(e)
    res.send(e)

}
})


app.post('/cleanerlogin', async (req, res)=>{

    try{
    console.log(req.body)
    const cleaner = await Cleaner.findByCredentials(req.body.cleanerid, req.body.password)
    req.session.cleanerid = cleaner.cleanerid
    
    res.send(cleaner)

    }
    catch(e){
        console.log(e)
        res.send(e)
    }
})

app.get('/NeededToClean', async (req, res)=>{


    try{
        const cleanerid = req.session.cleanerid
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




app.listen(3000, ()=>{
    console.log('server is up!')
})
