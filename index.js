var express= require("express");
var app= express();
var server= require("http").createServer(app);
var io= require("socket.io").listen(server);
app.use(express.static('public'));
server.listen(3000);
app.get("/", function(request, response){
response.sendFile(__dirname + "/index.html");
});
var connections=[];
io.sockets.on("connection", function(socket){
connections.push(socket);
console.log("подключились");
socket.on("disconnect",function(data){
connections.splice(connections.indexOf(socket), 1);
console.log("отсоединились");
});
socket.on("send", function(data){
	io.sockets.emit("add_mess", {msg:data.input, name:data.name, class:data.class});
});
});