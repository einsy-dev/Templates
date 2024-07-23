import { UserEntity, UserId } from './user.schema.js';

export function user(app, options, done) {
	const usersCollection = app.mongo.db.collection('users');

	app.post('/', { schema: { body: UserEntity } }, async (req, res) => {
		const result = await usersCollection.insertOne(req.body);
		res.send(result);
	});

	app.get('/', async (req, res) => {
		const result = await usersCollection.find({}).toArray();
		res.send(result);
	});

	app.get('/:id', { schema: { params: UserId } }, async (req, res) => {
		const result = await usersCollection.find({
			_id: app.mongo.ObjectId(req.params.id)
		});
		res.send(result);
	});

	app.put(
		'/:id',
		{ schema: { params: UserId, body: UserEntity } },
		async (req, res) => {
			const result = await usersCollection.updateOne(
				{ _id: app.mongo.ObjectId(req.params.id) },
				{ $set: req.body }
			);
			res.send(result);
		}
	);

	app.delete('/:id', { schema: { params: UserId } }, async (req, res) => {
		const result = await usersCollection.deleteOne({
			_id: app.mongo.ObjectId(req.params.id)
		});
		res.send(result);
	});

	done();
}
