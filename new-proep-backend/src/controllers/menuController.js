import menuModel from '../models/menuModel.js';

const menuController = {
    /**
     * Get all menus (tree structure)
     */
    async getMenus(req, res) {
        try {
            const menus = await menuModel.getAll();

            // Transform flat list to tree
            const menuMap = {};
            const rootMenus = [];

            // First pass: create map
            menus.forEach(menu => {
                menu.children = [];
                menuMap[menu.id] = menu;
            });

            // Second pass: link parents and children
            menus.forEach(menu => {
                if (menu.parent_id) {
                    if (menuMap[menu.parent_id]) {
                        menuMap[menu.parent_id].children.push(menu);
                    } else {
                        // Parent missing/deleted? potentially treat as root or orphan
                        rootMenus.push(menu);
                    }
                } else {
                    rootMenus.push(menu);
                }
            });

            res.json({
                success: true,
                data: rootMenus
            });
        } catch (error) {
            console.error('Error fetching menus:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    },

    /**
     * Create menu
     */
    async createMenu(req, res) {
        try {
            const { title, url, parent_id, menu_order, is_visible } = req.body;

            if (!title || !url) {
                return res.status(400).json({ success: false, message: 'Title and URL are required' });
            }

            const newMenu = await menuModel.create({ title, url, parent_id, menu_order, is_visible });

            res.status(201).json({
                success: true,
                data: newMenu,
                message: 'Menu created successfully'
            });
        } catch (error) {
            console.error('Error creating menu:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    },

    /**
     * Update menu
     */
    async updateMenu(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;

            // Remove fields that shouldn't be updated directly via this generic endpoint if necessary
            // For now trusting the input (admin only)

            const updatedMenu = await menuModel.updateSafe(id, updates);

            if (!updatedMenu) {
                return res.status(404).json({ success: false, message: 'Menu not found' });
            }

            res.json({
                success: true,
                data: updatedMenu,
                message: 'Menu updated successfully'
            });
        } catch (error) {
            console.error('Error updating menu:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    },

    /**
     * Delete menu
     */
    async deleteMenu(req, res) {
        try {
            const { id } = req.params;
            const result = await menuModel.delete(id);

            if (!result) {
                return res.status(404).json({ success: false, message: 'Menu not found' });
            }

            res.json({
                success: true,
                message: 'Menu deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting menu:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
};

export default menuController;
