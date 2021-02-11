import * as express from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

const router = require('./server/routes/routes');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);

app.listen(process.env.PORT, () => `Server running on port ${process.env.PORT}`);
