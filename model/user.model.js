 module.exports = (sequelize, DataTypes) => {
    const UserModel = sequelize.define('user', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        // sequelize, // We need to pass the connection instance
        modelName: 'user', // We need to choose the model name
        // don't forget to enable timestamps!
        timestamps: true,
        // I don't want createdAt
        createdAt: false,
        // I want updatedAt to actually be called updateTimestamp
        updatedAt: 'updateTimestamp'
    });

    return UserModel;
};