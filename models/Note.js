const db = require('../config/db');

class Note {
  static async findAllByUser(userId) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM notes WHERE user_id = ? ORDER BY updated_at DESC',
        [userId]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async findById(noteId, userId) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM notes WHERE id = ? AND user_id = ?',
        [noteId, userId]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(noteData) {
    const { user_id, title, content, pinned } = noteData;
    
    try {
      const [result] = await db.query(
        'INSERT INTO notes (user_id, title, content, pinned) VALUES (?, ?, ?, ?)',
        [user_id, title, content, pinned || false]
      );
      
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async update(noteId, userId, noteData) {
    const { title, content, pinned } = noteData;
    
    try {
      const [result] = await db.query(
        'UPDATE notes SET title = ?, content = ?, pinned = ? WHERE id = ? AND user_id = ?',
        [title, content, pinned || false, noteId, userId]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async delete(noteId, userId) {
    try {
      const [result] = await db.query(
        'DELETE FROM notes WHERE id = ? AND user_id = ?',
        [noteId, userId]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Note;