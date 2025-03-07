const mongoose = require('mongoose');
const RoleSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }]
});

module.exports = mongoose.model('Role', RoleSchema);