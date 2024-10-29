const express = require('express')
require('./mongoose/mongoose')

const Hostler = require('./models/hostlers')
const ToClean = require('./models/CleaningRecord')
const Cleaner = require('./models/staff')
const cors = require('cors')

const session = require('express-session')

const app = express()
app.use(cors())


// app.use(session({
//     secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 30 * 60 * 1000 } // Session expires after 30 minutes
// }));


const HostlerRouter = require('./routers/hostlers')
const CleanerRouter = require('./routers/cleaners')

app.use(express.json())
app.use(HostlerRouter)
app.use(CleanerRouter)

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

app.get('/', (req, res)=>{

    res.send('hello')

})

app.get('/FetchTest', async (req, res)=>{

    try{
        const requests = await ToClean.find({})
        console.log(requests)
        res.send(requests)
    }
    
    catch(e){
    
        console.log(e)
        res.send(e)
    
    }
    })    

// Main Endpoints ---- use routers



app.listen(3000, ()=>{
    console.log('server is up!')
})
