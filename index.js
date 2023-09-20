import app, { PORT } from './config/config.js';

import { sequelize, connectToDatabase } from './models/index.js';
import './models/user.model.js';
import './models/organization.model.js';

const startApp = async () => {
	connectToDatabase().then(() => {
		console.log('Database connection successful.');
		sequelize.sync({ force: true });
	});
	app.listen(PORT, () => {
		console.log(`Server started at port ${PORT}`);
	});
};

startApp();
