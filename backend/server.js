const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

// Wait for DB to be ready (simple retry logic could be added here, but keep it simple for now)

// Login Route
app.post('/api/login', async (req, res) => {
    const { operatorId, securityKey } = req.body;

    try {
        // Query user
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [operatorId]);

        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const user = result.rows[0];

        // Verify Password
        const match = await bcrypt.compare(securityKey, user.password_hash);

        if (match) {
            // Create Token
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ success: true, token, user: { username: user.username } });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
