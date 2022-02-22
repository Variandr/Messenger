const pool = require("../db")
const errorHandler = require("../helpers/errorHandler")

class DialogsService {
    async getLastMessage(chatId) {
        return await pool.query("SELECT body, user_id FROM messages WHERE chat_id = $1 ORDER BY id DESC LIMIT 1", [chatId]).then(res => res.rows[0])
    }

    async getDialogData(chatId) {
        return await pool.query("SELECT * FROM chats WHERE id = $1", [chatId]).then(res => res.rows[0])

    }

    async getUsername(userId) {
        return await pool.query("SELECT username FROM users WHERE id = $1", [userId]).then(res => res.rows[0].username)
    }
    async getChatUsers(chatId){
        let usersId = await pool.query("SELECT user_id FROM participants WHERE chat_id = $1", [chatId])
        let usersData = usersId.rows.map(async u => {
            return await pool.query("SELECT id, username FROM users WHERE id = $1", [u.user_id]).then(res => res.rows[0])
        })
        return Promise.all(usersData)
    }
    async getDialogs(userId) {
        try {
            let chatsId = await pool.query("SELECT chat_id FROM participants WHERE user_id = $1", [userId]).then(res => res.rows)
            let data = chatsId.map(async c => {
                let chat = await this.getDialogData(c.chat_id)
                let messageData = await this.getLastMessage(c.chat_id)
                let message = messageData ? messageData.body : null
                let username = messageData ? await this.getUsername(messageData.user_id) : null
                return {
                    ...chat,
                    message: message,
                    username: username
                }
            })
            return Promise.all(data)
        } catch (e) {
            throw errorHandler.BadRequest("Dialogs wasn't found for this user")
        }
    }

    async getChatMessages(chatId) {
        try {
            let messagesData = await pool.query("SELECT * FROM messages WHERE chat_id = $1", [chatId])
            let messages = messagesData.rows.map(async m => {
                let username = messagesData ? await this.getUsername(m.user_id) : null
                return {...m, username}
            })
            return Promise.all(messages)
        } catch (e) {
            throw errorHandler.BadRequest("Chat for this user wasn't found")
        }
    }

    async getChatInfo(chatId) {
        try {
            let chatData = await pool.query("SELECT * FROM chats WHERE id = $1", [chatId])
            return {...chatData.rows[0]}
        } catch (e) {
            throw errorHandler.BadRequest("Chat for this user wasn't found")
        }
    }

    async createChat(chatName, users) {
        try {
            let date = new Date()
            let chatData = await pool.query("INSERT INTO chats (chat_name, created_at) VALUES ($1, $2) RETURNING id", [chatName, date])
            users.map(async (u) => {
                let check = await pool.query("SELECT * FROM participants WHERE chat_id = $1 AND user_id = $2", [chatData.rows[0].id, u.id])
                if (!check.rows.length) {
                    await pool.query("INSERT INTO participants (user_id, chat_id) VALUES ($1, $2)", [u.id, chatData.rows[0].id])
                }
                return u
            })
        } catch (e) {
            throw errorHandler.BadRequest("Chat wasn't created")
        }
    }

    async postMessage(chatId, message, userId) {
        try {
            let date = new Date()
            let messageData = await pool.query("INSERT INTO messages (chat_id, user_id, body, created_at) VALUES ($1, $2, $3, $4) RETURNING *", [chatId, userId, message, date])
            let username = await this.getUsername(messageData.rows[0].user_id)
            return {...messageData.rows[0], username}
        } catch (e) {
            throw errorHandler.BadRequest("Message wasn't sent")
        }
    }

    async updateMessage(msgId, message) {
        try {
            let date = new Date()
            let messageData = await pool.query("UPDATE messages SET body = $1, updated_at = $2 WHERE id = $3 RETURNING body, updated_at, id", [message, date, msgId])
            return messageData.rows[0]
        } catch (e) {
            throw errorHandler.BadRequest("Message wasn't updated")
        }
    }

    async addParticipant(chatId, userId) {
        try {
            let check = await pool.query("SELECT * FROM participants WHERE user_id = $1 AND chat_id = $2", [userId, chatId])
            if (!check.rows.length) {
                await pool.query("INSERT INTO participants (chat_id, user_id) VALUES ($1, $2)", [chatId, userId])
            } else errorHandler.BadRequest("User already in this chat")
        } catch (e) {
            throw errorHandler.BadRequest("User wasn't added in chat")
        }
    }

    async deleteMessage(msgId) {
        try {
            await pool.query("DELETE FROM messages WHERE id = $1", [msgId])
        } catch (e) {
            throw errorHandler.BadRequest("Message wasn't deleted")
        }
    }
    async setOnlineStatus(online, userId){
        try{
            await pool.query("UPDATE users SET online = $1 WHERE id = $2", [online, userId])
        }catch(e){
            throw errorHandler.BadRequest("Status wasn't changed")
        }
    }
}

module.exports = new DialogsService()