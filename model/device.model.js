module.exports = (sequelize, DataTypes) => {
    const DeviceModel = sequelize.define('device', {
        user_id: {
            type: DataTypes.INTEGER
        },
        device_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        online_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        sequelize, // We need to pass the connection instance
        modelName: 'device', // We need to choose the model name
        // don't forget to enable timestamps!
        timestamps: true,
        // I don't want createdAt
        createdAt: false,
        // I want updatedAt to actually be called updateTimestamp
        updatedAt: 'updateTimestamp'
    })

    return DeviceModel
}