import express from 'express';
import blogModel from '../models/blogModel.js';
import portfolioModel from '../models/portfolioModel.js';

const router = express.Router();

/**
 * @route   GET /api/public/blog
 * @desc    Published blog posts (public)
 * @access  Public
 */
router.get('/blog', async (req, res) => {
  try {
    const { language = 'az', limit = 20 } = req.query;
    
    const posts = await blogModel.getAll({
      status: 'published',
      language,
      limit: parseInt(limit)
    });

    return res.status(200).json({
      success: true,
      data: posts
    });
  } catch (error) {
    console.error('Get public blog error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

/**
 * @route   GET /api/public/blog/:postId
 * @desc    Get single blog post by post_id
 * @access  Public
 */
router.get('/blog/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    
    const post = await blogModel.getByPostId(postId);

    if (!post || post.status !== 'published') {
      return res.status(404).json({
        success: false,
        message: 'Post tapılmadı'
      });
    }

    // Increment views
    await blogModel.incrementViews(post.id);

    return res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Get post error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

/**
 * @route   GET /api/public/portfolio
 * @desc    Published portfolio projects (public)
 * @access  Public
 */
router.get('/portfolio', async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    
    const projects = await portfolioModel.getAll({
      status: 'published',
      limit: parseInt(limit)
    });

    return res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Get public portfolio error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
});

export default router;
