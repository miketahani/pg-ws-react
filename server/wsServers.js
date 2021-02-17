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

// FIXME should hydrate from a REST API, but wanted to keep the polling server
//  separate from the ws server and didn't want to code another server for the
//  websocket example
class HydrationServer extends WSServer {
  constructor ({ db, host, port = 4005 } = {}) {
    super({ host, port })
    this.db = db
    this.socketServer.on('connection', this.handleClientConnection)
  }

  handleClientConnection = async websocket => {
    console.log('[*] new hydration connection!')
    const data = await this.getLatestData()
    websocket.send(data)
  }

  getLatestData = async () => {
    const res = await this.db.query('SELECT * FROM foo LIMIT 100')

    // ugly data structure to mimic the db result object
    const data = JSON.stringify({
      payload: JSON.stringify({
        meta: { hydrate: true, retrieveDate: Date.now() },
        rows: res.rows
      })
    })

    return data
  }

  updateClients = async () => {
    const data = await this.getLatestData()
    this.socketServer.clients.forEach(websocket => websocket.send(data))
  }
}

module.exports = {
  NotificationServer,
  HydrationServer
}
