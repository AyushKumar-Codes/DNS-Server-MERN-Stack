import React, { useState } from 'react';

const Table = () => {
    const [hostname, setHostname] = useState('');
    const [type, setType] = useState('A');
    const [ttl, setTtl] = useState('');
    const [ipParts, setIpParts] = useState(['', '', '', '']); // For IP address parts
    const [value, setValue] = useState(''); // For CNAME and TXT value

    const handleSubmit = async (e) => {
        e.preventDefault();
        let recordValue;

        // Prepare the value based on the selected type
        if (type === 'A') {
            recordValue = ipParts.join('.');
        } else {
            recordValue = value; // CNAME or TXT
        }

        const newRecord = { hostname, type, ttl, value: recordValue };

        try {
            const response = await fetch('http://localhost:5000/dns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRecord),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Record added:', data);

                // Clear the form fields
                setHostname('');
                setType('A');
                setTtl('');
                setIpParts(['', '', '', '']);
                setValue('');

                alert('DNS record added successfully!');
            } else {
                const errorData = await response.json();
                console.error('Error from server:', errorData);
                alert('Failed to add DNS record. Please try again.');
            }
        } catch (error) {
            console.error('Error adding DNS record:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleIpChange = (index, value) => {
        const updatedIpParts = [...ipParts];
        updatedIpParts[index] = value.replace(/[^0-9]/g, ''); // Allow only numbers
        setIpParts(updatedIpParts);
    };

    return (
        <div className="table-responsive">
            <form onSubmit={handleSubmit}>
                <table className="table table-bordered sm m-0">
                    <thead>
                    <tr>
                        <th>Host Name</th>
                        <th>
                            <center>Type</center>
                        </th>
                        <th>
                            <center>TTL</center>
                        </th>
                        <th>
                            <center>Value</center>
                        </th>
                        <th>
                            <center>Actions</center>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Host Name"
                                value={hostname}
                                onChange={(e) => setHostname(e.target.value)}
                            />
                        </td>
                        <td>
                            <center>
                                <select
                                    name="type"
                                    className="form-control form-control-sm"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="A">A</option>
                                    <option value="CNAME">CNAME</option>
                                    <option value="TXT">TXT</option>
                                </select>
                            </center>
                        </td>
                        <td>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="TimeToLive in Minutes"
                                value={ttl}
                                onChange={(e) => setTtl(e.target.value)}
                            />
                        </td>
                        <td>
                            {type === 'A' ? (
                                <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', alignItems: 'center' }}>
                                    {ipParts.map((part, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            className="form-control form-control-sm"
                                            style={{ width: '60px' }}
                                            maxLength="3"
                                            placeholder="0-255"
                                            value={part}
                                            onChange={(e) => handleIpChange(index, e.target.value)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder={type === 'CNAME' ? "CNAME Value" : "TXT Value"}
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                            )}
                        </td>
                        <td>
                            <center>
                                <button
                                    type="submit"
                                    style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        outline: 'none',
                                        color: 'white',
                                    }}
                                >
                                    <a className="btn btn-info btn-sm">Add</a>
                                </button>
                            </center>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default Table;
