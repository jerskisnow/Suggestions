import { Client, Message, MessageEmbed } from 'discord.js';

import PostgreSQL from '../../structures/PostgreSQL';

export default async (client: Client, msg: Message, language: any): Promise<void> => {

    PostgreSQL.query('SELECT id, context, author, status FROM reports WHERE message = $1::text', [msg.id], async (error, result) => {
        if (error || !result.rows.length) {
            return;
        }
        const user = await msg.guild.members.fetch(result.rows[0].author);

        let title = "User Left ~ Suggestions";
        let picture = client.user.avatarURL();

        if (user != null) {
            // title = user.tag;
            // picture = user.avatarURL;
            title = user.user.tag;
            picture = user.user.avatarURL();
        }

        await msg.edit({
            embed: new MessageEmbed()
                .setAuthor(title, picture)
                .setColor(process.env.APPROVED_EMBED_COLOR)
                .setDescription(language.commands.report.description
                    .replace(/<Description>/g, result.rows[0].context)
                    .replace(/<Status>/g, language.reports.resolved)
                    .replace(/<ID>/g, result.rows[0].id)
                )
                .setTimestamp()
                .setFooter(process.env.EMBED_FOOTER)
        });

        PostgreSQL.query('UPDATE reports SET status = $1::text WHERE message = $2::text', ['Resolved', msg.id]);
    });

}