import Fastify from 'fastify';
import * as mongodb from '@fastify/mongodb';
import { user } from './user/user.controller.js';

const fastify = Fastify();
fastify.register(mongodb, {
	url: 'mongodb+srv://test:test@testcluster.kijskbu.mongodb.net/test',
	forceClose: true
});
fastify.register(user, { prefix: '/user' });

fastify.listen({ port: 3000 }, function (err) {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
});
