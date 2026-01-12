import pool from '../config/database.js';
import { sendTelegramNotification } from '../services/telegramService.js';
import messagesModel from '../models/messagesModel.js';
import { getIpAddress, getUserAgent } from '../utils/auth.js';

export const createAppeal = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { mail, phone_number, appeal, name, message } = req.body;

    // Insert appeal into database (köhnə table)
    const result = await client.query(
      `INSERT INTO admin.appeal (mail, phone_number, appeal, name, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, created_date, mail, phone_number, appeal, name, message`,
      [mail, phone_number, appeal, name, message]
    );

    const newAppeal = result.rows[0];

    // Appeal type mapping
    const appealTypeMap = {
      1: 'Web saytın yaradılması',
      2: 'AI Konsaltinq və Strategiya',
      3: 'Backend Development və API Həlləri',
      4: 'AI Model İnteqrasiyası',
      5: 'Avtomatlaşdırma Sistemləri',
      6: 'Data Analitika və Machine Learning',
      7: 'Mövcud Sistemin Təkmilləşdirilməsi',
      8: 'Texniki Dəstək və Konsaltinq',
      9: 'Digər'
    };

    // admin_messages table-ə də yaz
    const ipAddress = getIpAddress(req);
    const userAgent = getUserAgent(req);
    const subject = appealTypeMap[appeal] || 'Digər';

    await messagesModel.create({
      name,
      email: mail,
      phone_number,
      appeal_type: appeal,
      subject,
      message,
      ip_address: ipAddress,
      user_agent: userAgent,
      status: 'unread'
    });

    // Send Telegram notification (async, don't wait - don't block response)
    sendTelegramNotification(newAppeal).catch(error => {
      console.error('Failed to send Telegram notification:', error);
      // Don't fail the request if Telegram fails
    });

    res.status(201).json({
      success: true,
      message: 'Appeal created successfully',
      data: {
        id: newAppeal.id,
        created_date: newAppeal.created_date,
        mail: newAppeal.mail,
        phone_number: newAppeal.phone_number,
        appeal: newAppeal.appeal,
        name: newAppeal.name,
        message: newAppeal.message,
      },
    });
  } catch (error) {
    console.error('Error creating appeal:', error);
    
    // Handle database constraint errors
    if (error.code === '23514') {
      return res.status(400).json({
        success: false,
        message: 'Validation error: Invalid data provided',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  } finally {
    client.release();
  }
};

// Get all appeals (for admin, optional)
export const getAllAppeals = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const result = await client.query(
      `SELECT id, created_date, mail, phone_number, appeal, name, message
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
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  } finally {
    client.release();
  }
};
