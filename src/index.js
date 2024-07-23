import Fastify from 'fastify';
import * as mongodb from '@fastify/mongodb';
import * as jwt from '@fastify/jwt';
import * as env from '@fastify/env';
import { user } from './user/user.controller.js';

const fastify = Fastify();
await fastify.register(env, {
	dotenv: true,
	schema: {
		type: 'object',
		properties: {
			MONGODB_URI: { type: 'string' },
			PORT: { type: 'number', default: 3000 },
			SECRET: { type: 'string' }
		},
		required: ['MONGODB_URI', 'SECRET']
	}
});
await fastify.register(mongodb, {
	url: fastify.config.MONGODB_URI,
	forceClose: true
});
fastify.register(jwt, { secret: fastify.config.SECRET });
fastify.register(user, { prefix: '/user' });

fastify.listen({ port: fastify.config.PORT }, function (err) {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
	console.log(`Server listening on port ${fastify.config.PORT}`);
});
