const express = require('express')
const cookieParser = require('cookie-parser')
// import express from 'express'
const viewsRouter = require('./routes/views.router')
require('dotenv').config()
//__________________________________________________________________________
const { Server } = require('socket.io')

const app = express()
const PORT = 8080 || process.env.PORT

const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})

const io = new Server(httpServer)


// hbs __________________________________________________________________
const handlebars = require('express-handlebars')

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
// hbs __________________________________________


app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
// console.log(__dirname+'/public')
app.use('/static', express.static(__dirname+'/public'))
// mid de tercero
app.use(cookieParser())


app.use('/', viewsRouter)




let messages = []

io.on('connection', socket => {
    console.log('Nuevo cliente conectado')
    socket.on('message', data => {
        // console.log(data)
        messages.push(data)
        io.emit('messageLogs', messages)
    })

    socket.on('authenticated', data => {
        socket.broadcast.emit('newUserConnected', data)
    })

})

app.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).send('Todo mal')
})




