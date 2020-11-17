import express from 'express'
import http from 'http'
import io from 'socket.io'
import publicRoutes from './routes/public.route.'
import appRoutes from './routes/app.route.'
const app = express()
import {join} from 'path'

const server = http.createServer(app)

app.set('view engine', 'pug')
app.set('views', 'views')

app.use(express.static(join(__dirname, 'public')))


app.use('/auth', publicRoutes)

app.use('/', appRoutes)


const PORT = process.env.PORT || 5500

server.listen(PORT, () => console.log(`server running on port ${PORT}`))

