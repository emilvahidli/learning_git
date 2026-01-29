
import pool from '../config/database.js';
import { hashPassword } from '../utils/auth.js';

const seed = async () => {
    try {
        console.log('🌱 Seeding database...');

        // 1. Seed Menus
        // Check if menus exist
        const menuCount = await pool.query('SELECT COUNT(*) FROM admin.menus');
        if (parseInt(menuCount.rows[0].count) === 0) {
            console.log('INSERT: Default menus...');

            const menus = [
                { title: 'Dashboard', url: '/dashboard', order: 1, icon: 'LayoutDashboard' },
                { title: 'Users', url: '/users', order: 2, icon: 'Users' },
                { title: 'Data', url: '/data-root', order: 3, icon: 'Database' }, // Parent
                // Children of Data will be added after we have ID
                { title: 'Settings', url: '/settings-root', order: 90, icon: 'Settings' } // Parent
            ];

            // Insert roots
            for (const m of menus) {
                const res = await pool.query(
                    'INSERT INTO admin.menus (title, url, menu_order) VALUES ($1, $2, $3) RETURNING id, url',
                    [m.title, m.url, m.order]
                );
                const parentId = res.rows[0].id;

                // Add children for Data
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

                // Add children for Settings
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
        } else {
            console.log('SKIP: Menus already exist.');
        }

        // 2. Seed Users
        const userCount = await pool.query('SELECT COUNT(*) FROM admin.admin_frontend_users');
        if (parseInt(userCount.rows[0].count) === 0) {
            console.log('INSERT: Default admin user...');
            const pwhash = await hashPassword('password123'); // Ensure this func works or import bcrypt directly if needed.
            // Wait, hashPassword needs to be imported. I imported it. Assuming it uses bcryptjs or similar.

            await pool.query(`
                INSERT INTO admin.admin_frontend_users 
                (username, password_hash, full_name, email, position, status, can_delete)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            `, ['admin', pwhash, 'System Admin', 'admin@proep.az', 'Admin', 'active', false]);
        } else {
            console.log('SKIP: Users already exist.');
        }

        console.log('✅ Seeding completed.');

    } catch (error) {
        console.error('❌ Seeding error:', error);
    } finally {
        await pool.end();
    }
};

seed();
