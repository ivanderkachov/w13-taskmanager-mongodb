import express from 'express'
import path from 'path'
import cors from 'cors'
import sockjs from 'sockjs'

import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'


import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'


const { readFile, writeFile } = require('fs').promises


require('colors')

let Root
try {
  // eslint-disable-next-line import/no-unresolved
  Root = require('../dist/assets/js/ssr/root.bundle').default
} catch {
  console.log('SSR not found. Please run "yarn run build:ssr"'.red)
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const taskTemplate = {
  taskId: 'id',
  title: 'title',
  status: 'NEW',
  _isDeleted: false,
  _createdAt: null,
  _deletedAt: null
}

const statusList = ['NEW', 'IN_PROGRESS', 'BLOCKED', 'DONE']

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  express.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

server.get('/api/v1/tasks/:category', async (req, res) => {
  const { category } = req.params
  const tasks = await readFile(`${__dirname}/data/${category}.json`, { encoding: 'utf8' })
    .then((text) => {
      const del = '_isDeleted'
      return JSON.parse(text)
      .filter((task) => !task[del])
      .map((filteredTask) => {
        return Object.keys(filteredTask).reduce((acc, rec) => {
          if (rec[0] !== '_') {
            return { ...acc, [rec]: filteredTask[rec] }
          }
          return acc
        }, {})
      })
    })
    .catch(() => [])
  res.json(tasks)
})

server.post('/api/v1/tasks/:category', async (req, res) => {
  const { category } = req.params
  const taskData = req.body.body.text
  const newTask = {
    ...taskTemplate,
    taskId: 'id',
    title: taskData,
    _createdAt: +new Date()
  }
   await readFile(`${__dirname}/data/${category}.json`, { encoding: 'utf8' })
    .then((text) => {
      const tasksOut = JSON.parse(text)
      writeFile(`${__dirname}/data/${category}.json`, JSON.stringify([...tasksOut, newTask]), {
        encoding: 'utf8'
      })
    })
    .catch(() => {
      writeFile(`${__dirname}/data/${category}.json`, JSON.stringify([newTask]), {
        encoding: 'utf8'
      })
    })
  res.json({ statuts: 'TASKS UPDATED' })
})

server.patch('/api/v1/tasks/:category/:id', async (req, res) => {
  const { category, id } = req.params
  const taskData = req.body.body.status
  if (statusList.includes(taskData)) {
      await readFile(`${__dirname}/data/${category}.json`, { encoding: 'utf8' })
        .then((text) => {
          const st = 'status'
          const tasksOut = JSON.parse(text)
          const newTasks = tasksOut.map((item) =>
            item.title === `${id}` ? { ...item, [st]: taskData } : item
          )
          writeFile(`${__dirname}/data/${category}.json`, JSON.stringify(newTasks), {
            encoding: 'utf8'
          })
        })
        .catch((err) => {
          console.log(err)
        })
  } else {
    res.status(501).json({"status": "error", "message": "incorrect status"})
  }

  res.json({ statuts: 'TASKS UPDATED' })
})

server.delete('/api/v1/tasks/:category/:id', async (req, res) => {
  const { category, id } = req.params
    await readFile(`${__dirname}/data/${category}.json`, { encoding: 'utf8' })
      .then((text) => {
        const delTask = "_isDeleted"
        const tasksOut = JSON.parse(text)
        const newTasks = tasksOut.map((item) =>
          item.title === `${id}` ? { ...item, [delTask]: true } : item
        )
        writeFile(`${__dirname}/data/${category}.json`, JSON.stringify(newTasks), {
          encoding: 'utf8'
        })
      })
      .catch((err) => {
        console.log(err)
      })

  res.json({ statuts: 'TASKS UPDATED' })
  })


server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
