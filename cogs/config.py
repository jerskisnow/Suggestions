from discord.ext import commands
from discord_slash import cog_ext, SlashContext
from discord_slash.utils.manage_commands import create_option
from main import allowed_guilds


class Config(commands.Cog):
    def __init__(self, client):
        self.client = client

    @cog_ext.cog_subcommand(base="config", name="sug-channel", description="Configure the suggestion channel. (Admin)",
                            options=[create_option(option_type=3, name="channel",
                                                   description="The channel where suggestions should appear.",
                                                   required=True)], guild_ids=allowed_guilds)
    @commands.has_permissions(administrator=True)
    async def sugchannel_config(self, ctx: SlashContext, channel):
        await ctx.send(content="This command is coming soon!")

    @cog_ext.cog_subcommand(base="config", name="rep-channel", description="Configure the report channel. (Admin)",
                            options=[create_option(option_type=3, name="channel",
                                                   description="The channel where reports should appear.",
                                                   required=True)], guild_ids=allowed_guilds)
    @commands.has_permissions(administrator=True)
    async def repchannel_config(self, ctx: SlashContext, channel):
        await ctx.send(content="This command is coming soon!")

    @cog_ext.cog_subcommand(base="config", name="log-channel", description="Configure the log channel. (Admin)",
                            options=[create_option(option_type=3, name="channel",
                                                   description="The channel where logs should appear.",
                                                   required=True)], guild_ids=allowed_guilds)
    @commands.has_permissions(administrator=True)
    async def logchannel_config(self, ctx: SlashContext, channel):
        await ctx.send(content="This command is coming soon!")

    @cog_ext.cog_subcommand(base="config", name="ticket-message",
                            description="Configure the message people can react to in order to create a ticket. (Admin)",
                            options=[create_option(option_type=3, name="message-id",
                                                   description="The ID of a message where people need to react to.",
                                                   required=True)], guild_ids=allowed_guilds)
    @commands.has_permissions(administrator=True)
    async def ticketmessage_config(self, ctx: SlashContext, message_id):
        await ctx.send(content="This command is coming soon!")

    @cog_ext.cog_subcommand(base="config", name="approve-emoji",
                            description="Configure the approve emoticon that should be used. (Admin)",
                            options=[create_option(option_type=3, name="emoji",
                                                   description="The emoji approve that should be used on the suggestion message.",
                                                   required=True)], guild_ids=allowed_guilds)
    @commands.has_permissions(administrator=True)
    async def approvemoji_config(self, ctx: SlashContext, emoji):
        await ctx.send(content="This command is coming soon!")

    @cog_ext.cog_subcommand(base="config", name="reject-emoji",
                            description="Configure the reject emoticon that should be used. (Admin)",
                            options=[create_option(option_type=3, name="emoji",
                                                   description="The emoji reject that should be used on the suggestion message.",
                                                   required=True)], guild_ids=allowed_guilds)
    @commands.has_permissions(administrator=True)
    async def rejectmoji_config(self, ctx: SlashContext, emoji):
        await ctx.send(content="This command is coming soon!")

    @cog_ext.cog_subcommand(base="config", name="staff-role",
                            description="Configure the role that needs to be able to interact with suggestions, reports, polls and tickets. (Admin)",
                            options=[create_option(option_type=8, name="role",
                                                   description="The emoji reject that should be used on the suggestion message.",
                                                   required=True)], guild_ids=allowed_guilds)
    @commands.has_permissions(administrator=True)
    async def staffrole_config(self, ctx: SlashContext, role):
        await ctx.send(content="This command is coming soon!")

    @cog_ext.cog_subcommand(base="config", name="help",
                            description="Obtain some more information about the config command. (Admin)",
                            guild_ids=allowed_guilds)
    @commands.has_permissions(administrator=True)
    async def help_config(self, ctx: SlashContext):
        await ctx.send(content="This command is coming soon!")

    @sugchannel_config.error
    @repchannel_config.error
    @logchannel_config.error
    @ticketmessage_config.error
    @approvemoji_config.error
    @rejectmoji_config.error
    @staffrole_config.error
    async def kick_error(self, ctx: SlashContext, error):
        if isinstance(error, commands.MissingPermissions):
            await ctx.send("You do not have permission to do that, I'm sorry.")


def setup(client):
    client.add_cog(Config(client))
