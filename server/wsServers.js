const WebSocket = require('ws')

class WSServer {
  constructor ({ host = 'localhost', port }) {
    this.socketServer = new WebSocket.Server({ host, port })
  }
}

class NotificationServer extends WSServer {
  constructor ({ host, port = 4000 } = {}) {
    super({ host, port })
    this.socketServer.on('connection', this.handleClientConnection)
  }

  handleClientConnection = websocket => {
    console.log('[*] new notification connection!')
  }

  updateClients = msg => {
    this.socketServer.clients.forEach(websocket =>
      websocket.send(JSON.stringify(msg))
    )
  }
}

module.exports = {
  NotificationServer
}
