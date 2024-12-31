const mongoose = require('mongoose');

const DNSRecordSchema = new mongoose.Schema({
    hostname: { type: String, required: true },
    type: { type: String, enum: ['A', 'CNAME','TXT'], required: true },
    value: { type: String, required: true },
    ttl: { type: Number, default: 3600 },
});

module.exports = mongoose.model('DNSRecord', DNSRecordSchema);
