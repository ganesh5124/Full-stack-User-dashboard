const express = require("express");
const db = require("../../db");

const userRoutes = express.Router();

const PAGE_SIZE = 10; // Number of items per page

// get all the users
userRoutes.get('/get/all/roles', async (req, res) => {
    let response = {
        status: false,
        message: null,
        data: null,
    }

    try {
        // For pagination
        const { page = 1, limit = PAGE_SIZE, searchTerm } = req.query;
        const offset = (page - 1) * limit;

        console.log(page, limit , searchTerm);
        const data = await db('users').offset(offset).limit(limit);
        const totalUsers = await db('users').count('id as total').first();
        console.log('data', data);
        console.log('totalUsers', totalUsers);
        

        // if data contains any length it will enter the loop
        if (data?.length) {
            response = {
                status: true,
                message: "Users fetched successfully",
                data: {
                    users: data,
                    pagination: {
                        total: totalUsers.total,
                        page: parseInt(page),
                        totalPages: Math.ceil(totalUsers.total / limit),
                        pageSize: limit
                    }
                }
            }
        } else {
            response.message = "No users found";
        }
        res.send(response)
    } catch (error) {
        console.log(error);
        response.message = "Internal Server Error";
        res.status(500).send(response);
    }
})

// get user details by id
userRoutes.get('/get/view/user/:id', async (req, res) => {
    let response = {
        status: false,
        message: null,
        data: null,
    }
    try {
        const { id } = req.params;
        const data = await db.select('*').from('users').where('id', id);
        console.log("data", data);
        if (data?.length) {
            response = {
                status: true,
                message: "User fetched successfully",
                data: data
            }
        }
        res.send(response)
    } catch (error) {
        console.log(error);
    }
})

userRoutes.put('/update/user',)

module.exports = userRoutes