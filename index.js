const express = require("express");
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.get('/chat/:chatId',(req,res)=>{
    
    
const group = io.of(req.params.chatId)

group.once('connection', (socket) => {
    
    console.log('a user connected',socket.id)
    socket.once('connectuser',(user)=>{
        group.emit('message',"user "+user+" connected")
        
        socket.on('send',(data)=>{
            group.emit('ret',data)
        })
        
        socket.on('disconnect',(mess)=>{
            group.emit('massage',"user "+ user +" disconnected")
        })
    })
  
  
//   socket.on('chatSend',(massage)=>{
//       group.emit('chatSendB',massage)
//   })
});

    
    res.sendFile(__dirname+'/template.html')
})

app.get('/file/:file',(req,res)=>{
    res.sendFile(__dirname+'/res/'+req.params.file)
})


server.listen(process.env.PORT || 5000 ,()=>{
    console.log('[server] running on port',5000)
} )