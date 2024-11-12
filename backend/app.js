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

app.post('/newhostler', async (req, res) => {

    console.log(req.body)
    try {
        const hostler = new Hostler(req.body)
        await hostler.save()
        res.status(200).send(hostler)
    }
    catch (e) {
        console.log(e)
        res.send(e)
    }
})

app.post('/newcleaner', async (req, res) => {

    console.log(req.body)

    try {
        const cleaner = new Cleaner(req.body)
        await cleaner.save()
        res.status(200).send(cleaner)
    }
    catch (e) {
        console.log(e)
        res.send(e)
    }

})

app.get('/', (req, res) => {

    res.send('hello')

})

app.get('/FetchTest', async (req, res) => {

    try {
        const requests = await ToClean.find({})
        console.log(requests)
        res.send(requests)
    }

    catch (e) {

        console.log(e)
        res.send(e)

    }
})

// Main Endpoints ---- use routers

app.post('/changepass', async (req, res) => {

    if (req.body.cleanerid) {

    const oldPass = req.body.oldpass

try{

    const cleaner = await Cleaner.findByCredentials(req.body.cleanerid, req.body.oldpass)
    cleaner.password = req.body.newpass
    // console.log(cleaner)    
    await cleaner.save()

    res.status(200).send(cleaner)

}
catch(e){

    res.status(400).send({error: e.message})

}

    }
    else if (req.body.rollnumber) {
        console.log("hii hostler")
        const oldPass = req.body.oldpass

        try {

            const hostler = await Hostler.findByCredentials(req.body.rollnumber, req.body.oldpass)
            hostler.password = req.body.newpass
            // console.log(hostler)
            await hostler.save()

            res.status(200).send(hostler)

        }
        catch (e) {

            res.status(400).send({ error: e.message })

        }

    }

    else res.status(400).send()

})

app.listen(3000, () => {
    console.log('server is up!')
})
