const express = require('express')
const {Server} = require('socket.io')
const {createServer} = require('http')

const app = express()
const server = createServer(app)
const io = new Server(server)

io.on('connection',(socket)=>{
    console.log(socket.id)
})
var scores = {
    IND : 0,
    AUS : 0
}

app.use(express.static('public'))

app.get('/incscore/:team',(req,res)=>{
    scores[req.params.team]++
    console.log(scores)
    io.emit('score',scores)
    res.json({message:'score updated'})
})
app.get('/getscores',(req,res)=>{
    res.json({scores:{...scores}})
})

server.listen(3500,()=>{
    console.log('server listening on 3500')
})