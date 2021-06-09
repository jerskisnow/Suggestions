const { Pool } = require('pg')
const config = require('../config')

const pool = new Pool({
    host: config.database.hostname,
    user: config.database.username,
    password: config.database.password,
    database: config.database.database,
    port: config.database.port,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0,
    max: 25
})

/* 
 * What do we save?
 *
 * GuildID:
 *  - SuggestionChannelID (suggestion_channel)
 *  - ReportChannelID (report_channel)
 *  - LogChannelID (log_channel)
 *  - Staffrole (staff_role)
 *  - ApproveEmoji (approve_emoji)
 *  - RejectEmoji (reject_emoji)
 *  - AutoApprove (auto_approve)
 *  - AutoReject (auto_reject)
 *  - DeleteApproved (delete_approved)
 *  - DeleteRejected (delete_rejected)
 *  - Premium (premium)
 *  - SuggestionBlacklist (suggestion_blacklist)
 *  - ReportBlakclist (report_blacklist)
 * 
 * SuggestionID:        ReportID:        PollID:
 *  - AuthorID           - AuthorID       - MessageID
 *  - MessageID          - MessageID      - ChannelID
 *  - ChannelID          - ChannelID      - GuildID
 *  - GuildID            - GuildID        - Context
 *  - Context            - Context        - Expires
 *  - Status             - Status         - Timestamp
 *  - Timestamp          - Timestamp
 */

module.exports.runQuery = async function (query, params) {
    const client = await pool.connect()
    let result
    try {
        result = !params ? await client.query(query) : await client.query(query, params)
    } catch (ex) {
        console.error(ex)
    } finally {
        client.release()
    }
    return result
}