import usersModel from '../models/usersModel.js';
import { hashPassword } from '../utils/auth.js';

/**
 * Get all users
 */
export const getUsers = async (req, res) => {
    try {
        const users = await usersModel.getAll();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

/**
 * Create new user
 */
export const createUser = async (req, res) => {
    try {
        const { username, email, full_name, role, password } = req.body;

        if (!username || !email || !full_name || !password) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Check existing
        const existing = await usersModel.getByUsername(username);
        if (existing) {
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }

        const password_hash = await hashPassword(password);

        // Map frontend "role" to DB fields if needed. 
        // For now, storing "role" is not directly supported in admin_frontend_users schema I saw earlier.
        // It had: company, position, status. No "role".
        // I will assume "position" or "company" might store it or I should have added a role column.
        // The DDL provided earlier for admin.admin_frontend_users DID NOT have a role column.
        // It had: company, position, status.
        // UsersPage.tsx uses role (Admin/Editor/Viewer).
        // I will overload 'position' for now to store Role, or just ignore it if schema is strict.
        // Better: store it in 'position' to persisting it.

        const newUser = await usersModel.create({
            username,
            email,
            full_name,
            password_hash,
            position: role || 'Viewer', // Storing role in position
            status: 'active'
        });

        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ success: false, message: 'Server error: ' + error.message });
    }
};

/**
 * Update user
 */
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, email, role, status, password } = req.body;

        const updateData = {};
        if (full_name) updateData.full_name = full_name;
        if (email) updateData.email = email;
        if (status) updateData.status = status;
        if (role) updateData.position = role; // Storing role in position
        if (password) {
            updateData.password_hash = await hashPassword(password);
        }

        const updatedUser = await usersModel.update(id, updateData);
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

/**
 * Delete user
 */
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await usersModel.delete(id);
        if (!success) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User deleted' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
