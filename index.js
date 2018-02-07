const server = require("http").Server();
const port = 10001;

var io = require("socket.io")(server);

var names=[];
var msgs=[];

io.on("connection", function(socket){
        console.log("user has connected"); 
    
     //this.state.name sent from the font end is stored as "data"   
    socket.on("uname", function(data){
        console.log("user name sent = "+data);
        names.push(data);
        
        //io is the entire server, everyone connected, and emit sends everyone connected a message
        io.emit("names", names);
    });
    
    socket.on("sendmsg", function(data){
        console.log("the msg = "+data);
        msgs.push(data);
        io.emit("msgs", msgs);
    });
    
    socket.on("disconnect", function(){
        console.log("user has disconnected");
    });
});

server.listen(port, (err)=>{
   if(err){
       console.log("error: "+err);
       return false;
   } 
    console.log("Socket port is running");
});