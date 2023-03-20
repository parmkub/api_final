const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const userService = require('../service/user.service')

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate user input
        if (!(email && password)) {
            res.status(400).send({ result: true, data: "All input is required" });
        }
        // Validate if user exist in our database
        const userModel = await userService.findByEmail(email)
        if (userModel && (await bcrypt.compare(password, userModel.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: userModel.id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "100d",
                }
            );
            userModel.token = token;
            res.status(200).send({ result: true, data: userModel })
        } else {
            res.status(404).send({ result: true, data: 'User not found' })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}

exports.register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body
        if (!(email && password && first_name && last_name)) {
            return res.status(400).send("All input is required");
        }
        const oldUser = await userService.findByEmail(email);
        if (oldUser) {
            return res.status(409).send({ result: false, data: "User Already Exist. Please Login" });
        }

        let encryptedPassword = await bcrypt.hash(password, 10);
        let obj = req.body;
        obj.password = encryptedPassword
        const model = await userService.createUser(obj);
        // Create token 
        const token = jwt.sign(
            { user_id: model.id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "100d",
            }
        );
        model.token = token
        // return new user
        res.status(201).send({ result: true, data: model })

    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}