import pool from '../config/database.js';
import { sendTelegramNotification } from '../services/telegramService.js';

/**
 * POST /api/appeal
 * Create new appeal from contact form
 */
export const createAppeal = async (req, res) => {
    const client = await pool.connect();

    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required',
            });
        }

        // Insert into admin.appeal table
        const result = await client.query(
            `INSERT INTO admin.appeal (name, mail, message, appeal, phone_number)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, created_date, name, mail as email, message`,
            [name, email, message, 5, ''] // appeal type 5 = general inquiry (constraint allows 1-5)
        );

        const newAppeal = result.rows[0];

        // Send Telegram notification (async, don't block response)
        sendTelegramNotification({
            name,
            email,
            message,
        }).catch(error => {
            console.error('Failed to send Telegram notification:', error.message);
        });

        res.status(201).json({
            success: true,
            message: 'Appeal created successfully',
            data: {
                id: newAppeal.id,
                created_date: newAppeal.created_date,
                name: newAppeal.name,
                email: newAppeal.email,
                message: newAppeal.message,
            },
        });
    } catch (error) {
        console.error('Error creating appeal:', error);

        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    } finally {
        client.release();
    }
};

/**
 * GET /api/appeals
 * Get all appeals (admin)
 */
export const getAllAppeals = async (req, res) => {
    const client = await pool.connect();

    try {
        const result = await client.query(
            `SELECT id, created_date, name, mail as email, message
       FROM admin.appeal
       ORDER BY created_date DESC
       LIMIT 100`
        );

        res.status(200).json({
            success: true,
            data: result.rows,
            count: result.rows.length,
        });
    } catch (error) {
        console.error('Error fetching appeals:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    } finally {
        client.release();
    }
};
