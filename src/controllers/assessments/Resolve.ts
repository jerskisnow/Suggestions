import { Client, Message, MessageEmbed } from 'discord.js';

import PostgreSQL from '../../structures/PostgreSQL';

export default async (client: Client, msg: Message, language: any, reason?: string): Promise<void> => {

    PostgreSQL.query('SELECT id, context, author, status FROM reports WHERE message = $1::text', [msg.id], async (error, result) => {
        if (error || !result.rows.length) {
            return;
        }
        let member;
        let picture;
        try {
            member = await msg.guild.members.fetch(result.rows[0].author);
        } catch (ex) {
            // Log error if the error is not a Unknown Member
            if (ex.code !== 10007) {
                console.error(ex);
            }
        } finally {
            if (member == null) {
                picture = client.user.avatarURL();
                member = "User Left ~ Suggestions";
            } else {
                // Set picture first
                picture = member.user.avatarURL();
                member = member.user.tag;
            }
        }

        await msg.edit({
            embed: new MessageEmbed()
                .setAuthor(member, picture)
                .setColor(process.env.APPROVED_EMBED_COLOR)
                .setDescription(language.commands.report.description
                    .replace(/<Description>/g, result.rows[0].context)
                    .replace(/<Status>/g, reason ? `${language.reports.resolved} (${reason})` : language.reports.resolved)
                    .replace(/<ID>/g, result.rows[0].id)
                )
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

        PostgreSQL.query('UPDATE reports SET status = $1::text WHERE message = $2::text', ['Resolved', msg.id]);
    });

}