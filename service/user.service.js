const db = require('../db/db')

exports.findByEmail = async (email) => {
    const userModel = await db.user.findOne({
        where: {
            email: email
        }
    });

    return userModel
}

exports.createUser = async (e) => {
    const model = await db.user.create({
        first_name: e.first_name,
        last_name: e.last_name,
        email: e.email.toLowerCase(),
        password: e.password,
        token: e.token
    });
    return model
}