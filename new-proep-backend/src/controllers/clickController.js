import pool from '../config/database.js';

/**
 * POST /api/click
 * Track link clicks
 */
export const trackClick = async (req, res) => {
    const client = await pool.connect();

    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: 'URL is required',
            });
        }

        // Upsert: increment count if exists, insert if not
        const result = await client.query(
            `INSERT INTO admin.link_clicks (url, count, last_clicked)
       VALUES ($1, 1, NOW())
       ON CONFLICT (url) 
       DO UPDATE SET 
         count = admin.link_clicks.count + 1,
         last_clicked = NOW()
       RETURNING id, url, count, last_clicked`,
            [url]
        );

        res.status(200).json({
            success: true,
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Error tracking click:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    } finally {
        client.release();
    }
};

/**
 * GET /api/clicks
 * Get all click statistics (admin)
 */
export const getClickStats = async (req, res) => {
    const client = await pool.connect();

    try {
        const { minCount, maxCount, startDate, endDate } = req.query;

        let query = `
      SELECT id, url, count, last_clicked, created_at
      FROM admin.link_clicks
      WHERE 1=1
    `;
        const params = [];
        let paramIndex = 1;

        if (minCount) {
            query += ` AND count >= $${paramIndex}`;
            params.push(parseInt(minCount));
            paramIndex++;
        }

        if (maxCount) {
            query += ` AND count <= $${paramIndex}`;
            params.push(parseInt(maxCount));
            paramIndex++;
        }

        if (startDate) {
            query += ` AND last_clicked >= $${paramIndex}`;
            params.push(new Date(startDate));
            paramIndex++;
        }

        if (endDate) {
            query += ` AND last_clicked <= $${paramIndex}`;
            params.push(new Date(endDate));
            paramIndex++;
        }

        query += ` ORDER BY count DESC LIMIT 100`;

        const result = await client.query(query, params);

        // Get top clicked for chart data
        const topClicked = await client.query(
            `SELECT url, count 
       FROM admin.link_clicks 
       ORDER BY count DESC 
       LIMIT 10`
        );

        res.status(200).json({
            success: true,
            data: result.rows,
            count: result.rows.length,
            chartData: topClicked.rows,
        });
    } catch (error) {
        console.error('Error fetching click stats:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    } finally {
        client.release();
    }
};
