export function user(fastify, options, done) {
	fastify.get('/', async (request, reply) => {
		reply.send({ message: 'Hello, World!' })
	})
	done()
}
