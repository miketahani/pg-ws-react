const express = require('express')
const cors = require('cors')

const db = require('./db')

const app = express()
app.use(cors())
app.use(express.json())

const log = console.log

app.post('/user/add', (req, res) => {
  ;(async () => {
    try {
      const { username } = req.body

      log(`[*] adding user: ${username}`)

      if (!username) {
        throw 'no username!'
      }

      /**
       * "If the same channel name is signaled multiple times from the same transaction
       * with identical payload strings, the database server can decide to deliver a
       * single notification only. On the other hand, notifications with distinct
       * payload strings will always be delivered as distinct notifications. Similarly,
       * notifications from different transactions will never get folded into one
       * notification."
       * - https://www.postgresql.org/docs/current/sql-notify.html
       *
       * so don't insert multiple records at the same time if you want to get a
       * notification for every change
       */
      await db.query('INSERT INTO foo (name) VALUES ($1);', [username])

      res.sendStatus(200)
    } catch (e) {
      console.error(e)
      res.sendStatus(500)
    }
  })();
})

app.post('/user/remove', (req, res) => {
  ;(async () => {
    try {
      const { id } = req.body

      log(`[*] removing user id: ${id}`)

      if (!id) {
        throw 'no id!'
      }

      await db.query('DELETE FROM foo where id = $1;', [id])

      res.sendStatus(200)
    } catch (e) {
      console.error(e)
      res.sendStatus(500) //.send({ error: e })
    }
  })();
})

app.get('/user/list', (req, res) => {
  ;(async () => {
    const results = await db.query('SELECT * FROM foo LIMIT 100;')
    res.json({ meta: { retrieveDate: Date.now() }, rows: results.rows })
  })();
})

app.listen(5000, () => log('[*] started REST server'))

process.on('SIGINT', () => {
  log('[*] exiting')
  db.end()
  process.exit()
})
