const express = require('express');
const mongoose = require('mongoose');
const dgram = require('dgram');
const dnsPacket = require('dns-packet');
const cors = require('cors');
const server = dgram.createSocket('udp4');
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dns-db', { useNewUrlParser: true, useUnifiedTopology: true });
const DNSRecord = require('./DNSRecord');

const app = express();
app.use(express.json());
app.use(cors());

// Recursive resolver function to handle CNAME chains
async function resolveDomain(domain) {
    const records = [];
    let currentDomain = domain;

    while (currentDomain) {
        const record = await DNSRecord.findOne({ hostname: currentDomain });

        if (!record) {
            console.error(`Domain ${currentDomain} not found in database.`);
            break;
        }

        records.push({
            type: record.type,
            class: 'IN',
            name: currentDomain,
            data: record.value,
            ttl: record.ttl,
        });

        if (record.type === 'A') break;
        currentDomain = record.type === 'CNAME' ? record.value : null;
    }

    return records;
}

// UDP DNS Server
server.on('message', async (msg, rinfo) => {
    const incomingReq = dnsPacket.decode(msg);

    const domain = incomingReq.questions[0]?.name;
    if (!domain) {
        console.error('Invalid DNS request: No question found.');
        return;
    }

    const answers = await resolveDomain(domain);

    if (answers.length === 0) {
        console.error(`No valid answer found for domain ${domain}.`);
        return;
    }

    const response = dnsPacket.encode({
        type: 'response',
        id: incomingReq.id,
        flags: 0x8400,
        questions: incomingReq.questions,
        answers: answers,
    });

    server.send(response, rinfo.port, rinfo.address, (err) => {
        if (err) console.error(err);
    });
});

server.bind(53, () => console.log('DNS Server is running on port 53'));

// REST API for DNS management
app.post('/dns', async (req, res) => {
    const { hostname, type, value ,ttl} = req.body;

    try {
        const newRecord = new DNSRecord({ hostname, type, value ,ttl});
        await newRecord.save();
        res.status(201).json({ message: 'DNS record added', record: newRecord });
    } catch (error) {
        console.error('Error adding DNS record:', error);
        res.status(500).json({ message: 'Error adding DNS record' });
    }
});

// GET route to fetch all DNS records
app.get('/dns', async (req, res) => {
    try {
        const records = await DNSRecord.find();
        res.status(200).json(records);
    } catch (error) {
        console.error('Error fetching DNS records:', error);
        res.status(500).json({ message: 'Error fetching DNS records' });
    }
});
app.delete('/dns/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await DNSRecord.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting DNS record:', error);
        res.status(500).json({ error: 'Failed to delete DNS record' });
    }
});
app.put('/dns/:id', async (req, res) => {
    try {
        const updatedRecord = await DNSRecord.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedRecord) {
            return res.status(404).send('Record not found');
        }
        res.send(updatedRecord);
    } catch (err) {
        console.error('Error updating DNS record:', err);
        res.status(500).send('Server error');
    }
});

app.listen(5000, () => console.log('REST API running on port 5000'));
