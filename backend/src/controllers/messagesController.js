import messagesModel from '../models/messagesModel.js';

/**
 * Bütün mesajları əldə et
 */
export async function getAllMessages(req, res) {
  try {
    const { status, search, limit = 50, offset = 0 } = req.query;
    
    const messages = await messagesModel.getAll({
      status,
      search,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const stats = await messagesModel.getStats();

    return res.status(200).json({
      success: true,
      data: {
        messages,
        stats
      }
    });
  } catch (error) {
    console.error('Get messages error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}

/**
 * Bir mesajı əldə et
 */
export async function getMessage(req, res) {
  try {
    const { id } = req.params;
    
    const message = await messagesModel.getById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Mesaj tapılmadı'
      });
    }

    // Əgər unread-dirsə, read et
    if (message.status === 'unread') {
      await messagesModel.markAsRead(id);
      message.status = 'read';
    }

    return res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error('Get message error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}

/**
 * Mesaja cavab yaz
 */
export async function replyMessage(req, res) {
  try {
    const { id } = req.params;
    const { reply_message } = req.body;
    const adminId = req.admin.id;

    if (!reply_message) {
      return res.status(400).json({
        success: false,
        message: 'Cavab mesajı tələb olunur'
      });
    }

    const message = await messagesModel.reply(id, reply_message, adminId);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Mesaj tapılmadı'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Cavab uğurla göndərildi',
      data: message
    });
  } catch (error) {
    console.error('Reply message error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}

/**
 * Mesajı arxivlə
 */
export async function archiveMessage(req, res) {
  try {
    const { id } = req.params;

    const message = await messagesModel.archive(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Mesaj tapılmadı'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Mesaj arxivləndi',
      data: message
    });
  } catch (error) {
    console.error('Archive message error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}

/**
 * Mesajı sil
 */
export async function deleteMessage(req, res) {
  try {
    const { id } = req.params;

    await messagesModel.delete(id);

    return res.status(200).json({
      success: true,
      message: 'Mesaj silindi'
    });
  } catch (error) {
    console.error('Delete message error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}
