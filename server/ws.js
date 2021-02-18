// IMPORTANT! pools will use environment variables for connection information
// The default values for the environment variables used are:
// PGHOST='localhost'
// PGUSER=process.env.USER
// PGDATABASE=process.env.USER
// PGPASSWORD=null
// PGPORT=5432
// (source: https://node-postgres.com/features/connecting)
const { Pool, Client } = require('pg')
const { NotificationServer } = require('./wsServers')

const pgClient = new Client()
const notificationServer = new NotificationServer()

pgClient.on('end', () => {
    process.exit()
})

init(pgClient)

async function init (pgClient) {
  await pgClient.connect()
  await pgClient.query('LISTEN watchers')

  console.log('[*] listening for events')

  pgClient.on('notification', handlePGNotification)
}

function handlePGNotification (msg) {
  console.log(`[*] notification! ${msg.payload}`)
  console.log(`[*] broadcasting`)

  const payload = JSON.parse(msg.payload)
  payload.meta.retrieveDate = Date.now()
  msg.payload = JSON.stringify(payload)

  notificationServer.updateClients(msg)
}

async function cleanup () {
  return await pgClient.end()
}

process.on('SIGINT', () => {
  console.log('\n[*] exiting')

  cleanup().then(() => {
    console.log('[*] done')
    process.exit()
  })
})
