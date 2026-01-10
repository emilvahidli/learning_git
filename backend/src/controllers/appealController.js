import pool from '../config/database.js';

export const createAppeal = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { mail, phone_number, appeal, name, message } = req.body;

    // Insert appeal into database
    const result = await client.query(
      `INSERT INTO admin.appeal (mail, phone_number, appeal, name, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, created_date, mail, phone_number, appeal, name, message`,
      [mail, phone_number, appeal, name, message]
    );

    const newAppeal = result.rows[0];

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
