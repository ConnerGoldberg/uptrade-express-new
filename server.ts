import * as express from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
const router = require('./server/routes/routes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);

app.listen(process.env.PORT, () => `Server running on port ${process.env.PORT}`);
