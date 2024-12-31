import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomRecordsTable = () => {
    const [records, setRecords] = useState([]);
    const [editingRecord, setEditingRecord] = useState(null); // Track which record is being edited
    const [updatedRecord, setUpdatedRecord] = useState({}); // Store the updated record's data

    // Fetch records from the backend
    const fetchRecords = async () => {
        try {
            const response = await axios.get('http://localhost:5000/dns'); // Replace with your backend URL
            setRecords(response.data);
        } catch (error) {
            console.error('Failed to fetch DNS records:', error);
        }
    };

    // Use polling to refresh the table periodically
    useEffect(() => {
        fetchRecords(); // Initial fetch
        const interval = setInterval(() => {
            fetchRecords();
        }, 5000); // Poll every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    // Delete record handler
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/dns/${id}`); // Replace with your delete endpoint
            fetchRecords(); // Refresh the table after deletion
        } catch (error) {
            console.error('Failed to delete DNS record:', error);
        }
    };

    // Edit record handler
    const handleEdit = (record) => {
        setEditingRecord(record._id);
        setUpdatedRecord(record); // Prefill the input fields with current values
    };

    // Handle input change for updating a record
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedRecord((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Update record handler
    const handleUpdate = async (id) => {
        // Ensure all required fields are filled
        if (!updatedRecord.hostname || !updatedRecord.type || !updatedRecord.ttl || !updatedRecord.value) {
            console.error('Missing fields in updated record:', updatedRecord);
            return;
        }

        try {
            console.log('Updating record with data:', updatedRecord); // Add logging to check the data being updated
            await axios.put(`http://localhost:5000/dns/${id}`, updatedRecord); // Replace with your update endpoint
            setEditingRecord(null); // Stop editing
            fetchRecords(); // Refresh the table after update
        } catch (error) {
            console.error('Failed to update DNS record:', error);
        }
    };

    return (
        <div className="section-container">
            <p className="section-title">Custom Records</p>
            <div className="table-responsive">
                <table className="table m-0">
                    <thead>
                    <tr>
                        <th>Host Name</th>
                        <th>Type</th>
                        <th>TTL</th>
                        <th>Value</th>
                        <th>
                            <center>Action</center>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.length > 0 ? (
                        records.map((record) => (
                            <tr key={record._id}>
                                <td>
                                    {editingRecord === record._id ? (
                                        <input
                                            type="text"
                                            name="hostname"
                                            value={updatedRecord.hostname || ''}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        record.hostname
                                    )}
                                </td>
                                <td>
                                    {editingRecord === record._id ? (
                                        <input
                                            type="text"
                                            name="type"
                                            value={updatedRecord.type || ''}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        record.type
                                    )}
                                </td>
                                <td>
                                    {editingRecord === record._id ? (
                                        <input
                                            type="text"
                                            name="ttl"
                                            value={updatedRecord.ttl || ''}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        record.ttl
                                    )}
                                </td>
                                <td>
                                    {editingRecord === record._id ? (
                                        <input
                                            type="text"
                                            name="value"
                                            value={updatedRecord.value || ''}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        record.value
                                    )}
                                </td>
                                <td>
                                    <center>
                                        {editingRecord === record._id ? (
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => handleUpdate(record._id)}
                                            >
                                                Done
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    className="btn btn-info btn-sm"
                                                    onClick={() => handleEdit(record)}
                                                >
                                                    Edit
                                                </button>{' '}
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(record._id)}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </center>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>
                                No records found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomRecordsTable;
