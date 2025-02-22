const mongoose = require('mongoose');
const Permission = require('../models/permission.js');

const permissions = [
    { name: "add_user" }, { name: "edit_user" }, { name: "view_user" }, { name: "delete_user" },
    { name: "add_candidate" }, { name: "edit_candidate" }, { name: "view_candidate" }, { name: "delete_candidate" }, { name: "vote_candidate" },
    { name: "add_student" }, { name: "edit_student" }, { name: "view_student" }, { name: "delete_student" },
    { name: "add_grievance" }, { name: "edit_grievance" }, { name: "view_grievance" }, { name: "delete_grievance" },
    { name: "add_event" }, { name: "edit_event" }, { name: "view_event" }, { name: "delete_event" },
    { name: "add_role" }, { name: "edit_role" }, { name: "view_role" }, { name: "delete_role" },
    { name: "add_blog" }, { name: "edit_blog" }, { name: "view_blog" }, { name: "delete_blog" }
];

const seedPermissions = async () => {
    try {
        await Permission.insertMany(permissions);
        mongoose.connection.close();
    } catch (error) {
        console.log(error);
    }
};

seedPermissions();