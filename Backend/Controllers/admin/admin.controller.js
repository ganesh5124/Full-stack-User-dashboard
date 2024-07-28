const express = require("express");
const db = require("../../db");
const Joi = require("joi");

const adminRoutes = express.Router();

adminRoutes.post('/add/user', async (req, res) => {
    let response = {
        status:false,
        message:null,
        data:null,
    }
    try {

        // joi validation for add user
        const userSchema = Joi.object({
            id: Joi.number().allow(null),
            firstname: Joi.string(),
            lastname: Joi.string(),
            email: Joi.string().required(),
            username: Joi.string().min(3).max(30).required(),
            password: Joi.string().required(),
            gender: Joi.number(),
            isActive: Joi.number()
        });
        const { error } = userSchema.validate(req.body);
        if (error) {
            // If validation fails, send back the validation error
            return res.status(400).json({ error: error.details[0].message });
        }
        console.log('data', req.body);

        let data = await db('users').insert(req.body);
        console.log(data, '-----data-----');
        response = {
            status: true,
            message: "User added successfully",
        }
        return res.send(response)

    } catch (error) {
        console.log('error', error);
        
         throw new Error(error)
    }
})

module.exports = adminRoutes