import { Client } from 'discord.js-light';
import express, { Express } from 'express';
import { getServerCount, getServer, getConfigValues } from '../managers/ServerData';
import PostgreSQL from '../structures/PostgreSQL';
import botCache from '../structures/BotCache';

// TODO: Add cors
export default class Server {
    private readonly client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public register = () => {
        const app = express();

        this.globalRoutes(app);
        this.serverRoutes(app);

        app.listen({
            port: botCache.config.serverPort
        });
    }

    private globalRoutes = (app: Express) => {
        app.get('/guilds/count', async (req, res) => {
            res.send({
                count: await getServerCount(this.client)
            }).status(200);
        });
    }

    private serverRoutes = (app: Express) => {
        app.get('/data/:guild_id', async (req, res) => {
            const { guild_id } = req.params;
            if (await this.isInGuild(guild_id)) {
                res.status(404);
            } else {
                let suggestionData: any = [];
                let reportData: any = [];

                const sData = await PostgreSQL.runQuery('SELECT id, context, author, message, status FROM suggestions WHERE guild = $1::text', [guild_id]);
                if (sData.rows.length) {
                    suggestionData = {
                        id: sData.rows[0].id,
                        context: sData.rows[0].context,
                        author: {
                            id: sData.rows[0].author,
                            name: await this.client.users.fetch(sData.rows[0].author)
                        },
                        message: sData.rows[0].message,
                        status: sData.rows[0].status
                    }
                }
                const rData = await PostgreSQL.runQuery('SELECT id, context, author, message, status FROM reports WHERE guild = $1::text', [guild_id]);
                if (rData.rows.length) {
                    reportData = {
                        id: rData.rows[0].id,
                        context: rData.rows[0].context,
                        author: {
                            id: rData.rows[0].author,
                            name: await this.client.users.fetch(rData.rows[0].author)
                        },
                        message: rData.rows[0].message,
                        status: rData.rows[0].status
                    }
                }
                res.send({
                    suggestions: suggestionData,
                    reports: reportData
                }).status(200);
            }
        });

        app.get('/configs/:guild_id', async (req, res) => {
            const { guild_id } = req.params;
            if (await this.isInGuild(guild_id)) {
                res.status(404);
            } else {
                const data = await getConfigValues(guild_id, ['prefix',
                    'language',
                    'staff_role',
                    'suggestion_channel',
                    'report_channel',
                    'log_channel',
                    'auto_approve',
                    'auto_reject',
                    'approve_emoji',
                    'reject_emoji',
                    'delete_approved',
                    'delete_rejected',
                    'suggestion_blacklist',
                    'report_blacklist',
                    'disabled',
                    'disable_reason'
                ]);
                res.send({ data }).status(200);
            }
        });
    }

    private isInGuild = async (guildID: string) => {
        return await getServer(this.client, guildID) != null;
    }
}