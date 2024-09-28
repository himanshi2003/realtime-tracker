const express = require('express');
const app = express();
const path = require('path');

// Socket.io boilerplate
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Serve CSS files from the 'css' directory
app.use('/css', express.static(path.join(__dirname, "public/css")));

// Serve JavaScript files from the 'js' directory
app.use('/js', express.static(path.join(__dirname, "public/js")));

// Socket.io connection event handler
io.on("connection", function(socket){
    socket.on("send-location",function(data){
        io.emit("received-location",{id:socket.id, ...data});

    });
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id);
    })
});

// Route to render the index page
app.get("/", function (req, res) {
    res.render("index");
});

// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});