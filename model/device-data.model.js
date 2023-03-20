module.exports = (sequelize, DataTypes) => {
    const DeviceDataModel = sequelize.define('data', {
        temperature: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        humidity: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        light: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        soil: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, {
        sequelize, // We need to pass the connection instance
        modelName: 'data', // We need to choose the model name
        // don't forget to enable timestamps!
        timestamps: true,
        // I don't want createdAt
        createdAt: false,
        // I want updatedAt to actually be called updateTimestamp
        updatedAt: 'updateTimestamp'
    })

    return DeviceDataModel
}