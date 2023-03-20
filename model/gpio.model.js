module.exports = (sequelize, DataTypes) => {
    const GpioModel = sequelize.define('gpio', {
        user_id: {
            type: DataTypes.INTEGER
        },
        index: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        deviceId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

    }, {
        sequelize, // We need to pass the connection instance
        modelName: 'gpio', // We need to choose the model name
        // don't forget to enable timestamps!
        timestamps: true,
        // I don't want createdAt
        createdAt: false,
        // I want updatedAt to actually be called updateTimestamp
        updatedAt: 'updateTimestamp'
    })

    return GpioModel
}