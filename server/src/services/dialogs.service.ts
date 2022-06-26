import pool from "../../config/database";
import errorHandler from "../helpers/error-handler";
import { User } from "index";

class DialogsService {
  async getLastMessage(chatId: number) {
    return await pool
      .query(
        "SELECT body, user_id FROM messages WHERE chat_id = $1 ORDER BY id DESC LIMIT 1",
        [chatId]
      )
      .then((res) => res.rows[0]);
  }

  async getDialogData(chatId: number) {
    return await pool
      .query("SELECT * FROM chats WHERE id = $1", [chatId])
      .then((res) => res.rows[0]);
  }

  async getUsername(userId: number) {
    return await pool
      .query("SELECT username FROM users WHERE id = $1", [userId])
      .then((res) => res.rows[0].username);
  }

  async getChatUsers(chatId: number) {
    const usersId = await pool.query(
      "SELECT user_id FROM participants WHERE chat_id = $1",
      [chatId]
    );
    const usersData = usersId.rows.map(async (u) => {
      return await pool
        .query(
          "SELECT id, username, online, last_online FROM users WHERE id = $1",
          [u.user_id]
        )
        .then((res) => res.rows[0]);
    });
    return Promise.all(usersData);
  }

  async getDialogs(userId: number) {
    try {
      const chatsId = await pool
        .query("SELECT chat_id FROM participants WHERE user_id = $1", [userId])
        .then((res) => res.rows);
      const data = chatsId.map(async (c) => {
        const chat = await this.getDialogData(c.chat_id);
        const messageData = await this.getLastMessage(c.chat_id);
        const username =
          (await this.getUsername(messageData.user_id)) || undefined;
        return {
          ...chat,
          message: messageData.body || undefined,
          username: username,
        };
      });
      return Promise.all(data);
    } catch (e) {
      throw errorHandler.BadRequest("Dialogs wasn't found for this user");
    }
  }

  async getChatMessages(chatId: number) {
    try {
      const messagesData = await pool.query(
        "SELECT * FROM messages WHERE chat_id = $1",
        [chatId]
      );
      const messages = messagesData.rows.map(async (m) => {
        const username = (await this.getUsername(m.user_id)) || undefined;
        return { ...m, username };
      });
      return Promise.all(messages);
    } catch (e) {
      throw errorHandler.BadRequest("Chat for this user wasn't found");
    }
  }

  async getChatInfo(chatId: number) {
    try {
      const chatData = await pool.query("SELECT * FROM chats WHERE id = $1", [
        chatId,
      ]);
      return { ...chatData.rows[0] };
    } catch (e) {
      throw errorHandler.BadRequest("Chat for this user wasn't found");
    }
  }

  async createChat(name: string, users: User[]) {
    try {
      const date = new Date();
      const chatData = await pool.query(
        "INSERT INTO chats (chat_name, created_at) VALUES ($1, $2) RETURNING id",
        [name, date]
      );
      const chatId = chatData.rows[0].id;
      users.map(async (u) => {
        const check = await pool.query(
          "SELECT * FROM participants WHERE chat_id = $1 AND user_id = $2",
          [chatId, u.id]
        );
        if (!check.rows.length) {
          await pool.query(
            "INSERT INTO participants (user_id, chat_id) VALUES ($1, $2)",
            [u.id, chatId]
          );
        }
        return u;
      });
    } catch (e) {
      throw errorHandler.BadRequest("Chat wasn't created");
    }
  }

  async postMessage(chatId: number, message: string, userId: number) {
    try {
      const date = new Date();
      const messageData = await pool.query(
        "INSERT INTO messages (chat_id, user_id, body, created_at) VALUES ($1, $2, $3, $4) RETURNING *",
        [chatId, userId, message, date]
      );
      const username = await this.getUsername(messageData.rows[0].user_id);
      return { ...messageData.rows[0], username };
    } catch (e) {
      throw errorHandler.BadRequest("Message wasn't sent");
    }
  }

  async updateMessage(msgId: number, message: string) {
    try {
      const date = new Date();
      const messageData = await pool.query(
        "UPDATE messages SET body = $1, updated_at = $2 WHERE id = $3 RETURNING body, created_at, updated_at, id",
        [message, date, msgId]
      );
      return messageData.rows[0];
    } catch (e) {
      throw errorHandler.BadRequest("Message wasn't updated");
    }
  }

  async addParticipant(chatId: string, userId: number) {
    const check = await pool.query(
      "SELECT * FROM participants WHERE user_id = $1 AND chat_id = $2",
      [userId, chatId]
    );
    if (check.rows.length !== 0) {
      throw errorHandler.BadRequest("User already in this chat");
    }
    await pool.query(
      "INSERT INTO participants (chat_id, user_id) VALUES ($1, $2)",
      [chatId, userId]
    );
  }

  async deleteMessage(msgId: number) {
    try {
      const messageData = await pool.query(
        "DELETE FROM messages WHERE id = $1 RETURNING *",
        [msgId]
      );
      return messageData.rows[0];
    } catch (e) {
      throw errorHandler.BadRequest("Message wasn't deleted");
    }
  }

  async setOnlineStatus(online: boolean, userId: number) {
    try {
      const date = new Date();
      await pool.query(
        "UPDATE users SET online = $1, last_online = $2 WHERE id = $3",
        [online, date, userId]
      );
    } catch (e) {
      throw errorHandler.BadRequest("Status wasn't changed");
    }
  }
}

export default DialogsService;
