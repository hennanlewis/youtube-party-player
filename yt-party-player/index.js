const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

server.listen(3000, () => {
    console.log("listening on *:3000")
})

io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected`)

    socket.join("room1")

    socket.on("onPlayerStateChange", (videoTime, eventData, socketID) => {
        socket.to("room1").emit("onPlayerStateChange", videoTime, eventData, socketID)
    })

    socket.on("disconnect", () => {
        console.log("User disconnected")
    })
})

io.emit("some event", { someProperty: "some value", otherProperty: "other value" })

io.on("connection", (socket) => {
    socket.broadcast.emit("hi")
})
