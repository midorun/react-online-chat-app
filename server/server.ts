import { Socket } from "socket.io"

type ContactType = {
  id: string,
  name?: string
}

type MessageType = {
  senderId: string,
  senderName?: string
  text: string
  fromCurrentUser?: boolean
}

const io = require("socket.io")({
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
}).listen(5000)

// const io = require("socket.io")(5000)

io.on('connection', (socket: Socket) => {
  const id = socket.handshake.query.id as string
  socket.join(id)

  socket.on('send-message',
    ({ recipients, message }: { recipients: Array<ContactType>, message: MessageType }) => {
      recipients.forEach((recipient) => {
        console.log(recipient);
        const newRecipients = recipients.filter((r) => JSON.stringify(r) !== JSON.stringify(recipient))
        newRecipients.push({ id, name: id })
        console.log(newRecipients);

        socket.broadcast.to(recipient.id).emit('receive-message', {
          recipients: newRecipients, message
        })
      })
    })
})

//! Неверное сравнение объектов

