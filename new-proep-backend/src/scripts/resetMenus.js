
import pool from '../config/database.js';

const reset = async () => {
    try {
        console.log('🗑️  Truncating admin.menus...');
        await pool.query('TRUNCATE TABLE admin.menus RESTART IDENTITY CASCADE');
        console.log('✅ Truncated.');

        console.log('🌱 Reseeding...');
        // Insert standard menus
        const menus = [
            { title: 'Dashboard', url: '/dashboard', order: 1, icon: 'LayoutDashboard' },
            { title: 'Users', url: '/users', order: 2, icon: 'Users' },
            { title: 'Data', url: '/data-root', order: 3, icon: 'Database' },
            { title: 'Settings', url: '/settings-root', order: 90, icon: 'Settings' }
        ];

        for (const m of menus) {
            const res = await pool.query(
                'INSERT INTO admin.menus (title, url, menu_order) VALUES ($1, $2, $3) RETURNING id',
                [m.title, m.url, m.order]
            );
            const parentId = res.rows[0].id;

            if (m.url === '/data-root') {
                await pool.query(
                    'INSERT INTO admin.menus (title, url, parent_id, menu_order) VALUES ($1, $2, $3, $4)',
                    ['Server Data', '/server-data', parentId, 1]
                );
                await pool.query(
                    'INSERT INTO admin.menus (title, url, parent_id, menu_order) VALUES ($1, $2, $3, $4)',
                    ['Messages', '/messages', parentId, 2]
                );
            }

            if (m.url === '/settings-root') {
                await pool.query(
                    'INSERT INTO admin.menus (title, url, parent_id, menu_order) VALUES ($1, $2, $3, $4)',
                    ['Menu Management', '/menu-management', parentId, 1]
                );
                await pool.query(
                    'INSERT INTO admin.menus (title, url, parent_id, menu_order) VALUES ($1, $2, $3, $4)',
                    ['Permissions', '/permissions', parentId, 2]
                );
                await pool.query(
                    'INSERT INTO admin.menus (title, url, parent_id, menu_order) VALUES ($1, $2, $3, $4)',
                    ['Notifications', '/notifications', parentId, 3]
                );
            }
        }
        console.log('✅ Menus Re-seeded.');

    } catch (error) {
        console.error('❌ Reset error:', error);
    } finally {
        await pool.end();
    }
};

reset();
