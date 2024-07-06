import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

try {
	app.listen(3001, () => {
		console.log('Server started on port 3000');
	});
} catch (error) {
	console.log(error);
}
