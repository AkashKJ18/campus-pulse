const mongoose = require('mongoose');
const EventSchema = mongoose.Schema({
    name: { type: String, required: [true, 'Event name is required!'] },
    description: { type: String, required: [true, 'Event description is required!'] },
    banner: { type: String },
    type: { type: String, required: [true, 'Event type is required!'] },
    from: { type: Date, required: [true, 'Event from date is required!'] },
    to: { type: Date, required: [true, 'Event to date is required!'] },
    status: { type: String, required: [true, 'Event status is required!'] },
    isPublished: { type: Boolean, default: false }
});

module.exports = mongoose.model('Event', EventSchema);