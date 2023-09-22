module.exports = (sequelize, DataTypes) => {
	const organization = sequelize.define('organization', {
		// id: {
		// 	allowNull: false,
		// 	autoIncrement: true,
		// 	primaryKey: true,
		// 	type: DataTypes.INTEGER,
		// },
		name: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		currency_code: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		lunch_price: {
			allowNull: false,
			type: DataTypes.DOUBLE(10, 2),
		},
		isDeleted: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: false,
		},
	});
	return organization;
};
