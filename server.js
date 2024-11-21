const jsonServer = require('json-server')
const auth = require('json-server-auth')
const cors = require('cors')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const corsOptions = {
	origin: ['http://localhost:8081', 'http://YOUR_API:8081'],
	credentials: true
}

server.use(cors(corsOptions))

server.db = router.db
server.use(middlewares)
server.use(auth)
server.use(router)

server.listen(3000, () => {
	console.log(
		'JSON Server is running on http://localhost:3000 web or http://YOUR_API:3000 mob'
	)
})
