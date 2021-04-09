from discord.ext import commands
from discord_slash import cog_ext, SlashContext
import asyncio
import discord
from structures.guild import Guild
from main import allowed_guilds


class Setup(commands.Cog):
    def __init__(self, client):
        self.client = client

    @cog_ext.cog_slash(name="setup", description="Set Suggestions up by answering a few simple questions.",
                       guild_ids=allowed_guilds)
    @commands.has_permissions(administrator=True)
    async def setup(self, ctx: SlashContext):
        # little intro part
        await ctx.send(embed=discord.Embed(description="Hi there, you just started the setup phase of the bot. "
                                                       "This will ask you a few question about how the bot should behave in your server. "
                                                       "Don't worry these questions are pretty simple. "
                                                       "After this you can start using Suggestions for your server.\n\n"
                                                       "Enter `continue` to proceed and `cancel` to stop the setup.",
                                           color=0x55aaee))

        def is_author(m):
            return m.author == ctx.author

        try:
            confirm_message = await ctx.bot.wait_for('message', check=is_author, timeout=30.)
        except asyncio.TimeoutError:
            return await ctx.channel.send(content="Sorry the setup is cancelled, it took you too long to respond.")

        if confirm_message.content.lower() != 'continue':
            return await ctx.channel.send(content="No problem! Setup cancelled.")

        # suggestion channel part
        await ctx.channel.send(
            embed=discord.Embed(description="In which channel should community made suggestions show up?", color=0x55aaee))

        try:
            channel_message = await ctx.bot.wait_for('message', check=is_author, timeout=30.)
        except asyncio.TimeoutError:
            return await ctx.channel.send(content="Sorry the setup is cancelled, it took you too long to respond.")

        channel_id = int(channel_message.content[2:-1])
        channel = ctx.bot.get_channel(channel_id)
        if channel is None:
            return await ctx.channel.send(content="Sorry the setup is cancelled, that channel is not valid.")

        # modrole part
        await ctx.channel.send(embed=discord.Embed(
            description="Which role should be able to change the status of suggestions and reports?",
            color=0x55aaee))

        try:
            role_message = await ctx.bot.wait_for('message', check=is_author, timeout=30.)
        except asyncio.TimeoutError:
            return await ctx.channel.send(content="Sorry the setup is cancelled, it took you too long to respond.")

        role_id = int(role_message.content[3:-1])
        role = ctx.guild.get_role(role_id)
        if role is None:
            return await ctx.channel.send(content="Sorry the setup is cancelled, that role is not valid.")

        # final part
        embed = discord.Embed(description="You successfully went through all the steps of the setup command. "
                                          "The following settings were updated:\n\n"
                                          "**Suggestion Channel: ** {suggestion_channel}\n"
                                          "**Staff Role: ** {staff_role}".format(suggestion_channel=channel.name,
                                                                                 staff_role=role.name), color=0x55aaee)
        await ctx.channel.send(embed=embed)

        guild = Guild(ctx.guild_id)

        # TODO: Create support for multiple updates in one request but for now use two
        await guild.set_setting('suggestion_channel', channel.id)
        await guild.set_setting('staff_role', role.id)

    @setup.error
    async def setup_error(self, ctx: SlashContext, error):
        if isinstance(error, commands.MissingPermissions):
            await ctx.send("You do not have permission to do that, I'm sorry.")


def setup(client):
    client.add_cog(Setup(client))
