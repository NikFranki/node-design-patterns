import { db } from './db.js'

db.connect()

async function updateLastAccess() {
  await db.query(`INSERT INOT (${Date.now()}) "LastAccesses"`)
}

updateLastAccess()
setTimeout(() => {
  updateLastAccess()
}, 600)