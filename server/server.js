const io = require('socket.io')(5000);

io.on('connection', socket => {
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on('send-message', ({ message, conversationToUpdate }) => {
    const [recipients] = conversationToUpdate
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient)
      newRecipient.push(id)
      socket.broadcast.to(recipient).emit('recieve-message', {
        recipients: newRecipients, sender: id, text
      })
    });
  })
})

