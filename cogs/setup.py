from discord.ext import commands
from discord_slash import cog_ext, SlashContext
import asyncio
import discord


class Setup(commands.Cog):
    def __init__(self, client):
        self.client = client

    @cog_ext.cog_slash(name="setup", description="Set Suggestions up by answering a few simple questions.",
                       guild_ids=[535089248785924107])
    async def _suggest(self, ctx: SlashContext):
        # suggestion channel part
        await ctx.send(content="In which channel do community made suggestions show up?")

        def is_author(m):
            return m.author == ctx.author

        try:
            channel_message = await ctx.bot.wait_for('message', check=is_author, timeout=30.)
        except asyncio.TimeoutError:
            return await ctx.channel.send(content="Sorry the setup is cancelled, it took you too long to respond.")

        channel_id = int(channel_message.content[2:-1])
        channel = ctx.bot.get_channel(channel_id)
        if channel is None:
            return await ctx.channel.send(content="Sorry the setup is cancelled, that channel is not valid.")

        # modrole part
        await ctx.channel.send(content="Which role should be able to change the status of suggestions and reports?")

        try:
            role_message = await ctx.bot.wait_for('message', check=is_author, timeout=30.)
        except asyncio.TimeoutError:
            return await ctx.channel.send(content="Sorry the setup is cancelled, it took you too long to respond.")

        role_id = int(role_message.content[3:-1])
        role = ctx.guild.get_role(role_id)
        if role is None:
            return await ctx.channel.send(content="Sorry the setup is cancelled, that role is not valid.")

        # final part
        await ctx.channel.send(content="Settings Updated:\n\n**Suggestion Channel: **{suggestion_channel}\n"
                                       "**Staff Role: **{staff_role}".format(suggestion_channel=channel.name,
                                                                             staff_role=role.name))

        # TODO: Update database


def setup(client):
    client.add_cog(Setup(client))
