# DNS Management Tool

## Description
🌐 A dynamic DNS management tool built with React.js and Node.js, enabling users to 📄 view, ✏️ edit, and ❌ delete DNS records seamlessly. This project features 🔄 real-time updates, an intuitive UI, and backend API integration for efficient DNS record management. 💻✨

## Features
- Add new DNS records (A, CNAME, TXT).
- Edit existing DNS records.
- Delete unwanted DNS records.
- View all DNS records in a responsive table.
- Intuitive user interface built with React.js.
- Backend API powered by Node.js and MongoDB for data persistence.

---

## Prerequisites

1. Node.js (v16 or higher)
2. MongoDB (local or cloud instance)
3. npm (comes with Node.js installation)

---

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/AyushKumar-Codes/DNS-Server-MERN-Stack.git
cd DNS-Server-MERN-Stack
```

### 2. Backend Setup
Navigate to the `backend` directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Start the backend server:
```bash
node server.js
```
The backend server will start running on `http://localhost:5000`.

### 3. Frontend Setup
Navigate to the `DNSHandler` directory:
```bash
cd ../DNSHandler
```

Install dependencies:
```bash
npm install
```

Start the frontend server:
```bash
npm start
```
The React.js application will open in your default browser at `http://localhost:3000`.

---

## How to Run the Project

1. **Backend**: Run `server.js` in the `backend` directory to start the API server:
   ```bash
   cd backend
   node server.js
   ```
   Make sure your MongoDB instance is running locally or modify the connection string in `server.js` to connect to a cloud database.

2. **Frontend**: Run the React.js app in the `DNSHandler` directory:
   ```bash
   cd dnshandler
   npm start
   ```

   Access the application at `http://localhost:3000` in your browser.

---

## Screenshot
![React.js UI Screenshot](screenshot.png)

---

## Dependencies

### Backend
- `express`: Web framework for Node.js.
- `mongoose`: ODM for MongoDB.
- `cors`: Middleware for enabling CORS.
- `dgram`: UDP socket for DNS server simulation.
- `dns-packet`: Library for encoding/decoding DNS packets.

Install backend dependencies with:
```bash
npm install express mongoose cors dgram dns-packet
```

### Frontend
- `react`: UI library.
- `react-dom`: React rendering.
- `bootstrap`: For styling the table and form.

Install frontend dependencies with:
```bash
npm install react react-dom bootstrap
```

---

## Working
1. **Add a DNS Record**: Use the form to specify the hostname, record type (A, CNAME, TXT), TTL, and value.
2. **Edit a DNS Record**: Click the ✏️ edit button to modify a record. When done, save the changes.
3. **Delete a DNS Record**: Click the ❌ delete button to remove a record.
4. **Responsive UI**: The application supports all screen sizes and provides a clean, easy-to-use interface.
5. **Real-Time Updates**: Changes to records are reflected immediately in the UI.

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit changes: `git commit -m "Add new feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## License
This project is licensed under the MIT License. See the LICENSE file for more information.

