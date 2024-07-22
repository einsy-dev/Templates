export function user(fastify, options, done) {
	fastify.get('/', async (request, reply) => {
		const users = await fastify.mongo.db.collection('users').find({}).toArray();
		reply.send(users);
	});
	done();
}
