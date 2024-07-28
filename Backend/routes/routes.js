const adminRoutes = require("../Controllers/admin/admin.controller");
const userRoutes = require("../Controllers/user/user.controller");

// Over All routes array to navigate different apis
const routes = [
    userRoutes,
    adminRoutes
]

module.exports = routes
