const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const db = require('./data/db-config')

function getAllUsers() { return db('users') }

async function insertUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO insert
  // AND GET BACK WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED RECORD
  // UNLIKE SQLITE WHICH ONLY GIVES US AN [ID] AND FORCES US DO DO A 2ND DB CALL
  const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
  return newUserObject
}

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.get('/api/users', async (req, res) => {
  res.json(await getAllUsers())
})

server.post('/api/users', async (req, res) => {
  res.status(201).json(await insertUser(req.body))
})

module.exports = server
