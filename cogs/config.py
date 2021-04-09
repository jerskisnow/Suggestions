from discord.ext import commands
from discord_slash import cog_ext, SlashContext
from discord_slash.utils.manage_commands import create_option


class Config(commands.Cog):
    def __init__(self, client):
        self.client = client

    @cog_ext.cog_subcommand(base="config", name="sug-channel", description="Configure the suggestion channel.",
                            options=[create_option(option_type=3, name="channel", description="The channel where suggestions should appear.",
                                                   required=True)], guild_ids=[535089248785924107])
    async def sugchannel_config(self, ctx: SlashContext, channel):
        await ctx.send(content="This command is coming soon!")

    @cog_ext.cog_subcommand(base="config", name="rep-channel", description="Configure the report channel.",
                            options=[create_option(option_type=3, name="channel", description="The channel where reports should appear.",
                                                   required=True)], guild_ids=[535089248785924107])
    async def repchannel_config(self, ctx: SlashContext, channel):
        await ctx.send(content="This command is coming soon!")

    @cog_ext.cog_subcommand(base="config", name="log-channel", description="Configure the log channel.",
                            options=[create_option(option_type=3, name="channel", description="The channel where logs should appear.",
                                                   required=True)], guild_ids=[535089248785924107])
    async def logchannel_config(self, ctx: SlashContext, channel):
        await ctx.send(content="This command is coming soon!")

    @cog_ext.cog_subcommand(base="config", name="ticket-message", description="Configure the message people can react to in order to create a ticket.",
                            options=[create_option(option_type=3, name="message-id", description="The ID of a message where people need to react to.",
                                                   required=True)], guild_ids=[535089248785924107])
    async def ticketmessage_config(self, ctx: SlashContext, message_id):
        await ctx.send(content="This command is coming soon!")

    @cog_ext.cog_subcommand(base="config", name="approve-emoji", description="Configure the approve emoticon that should be used.",
                            options=[create_option(option_type=3, name="emoji", description="The emoji approve that should be used on the suggestion message.",
                                                   required=True)], guild_ids=[535089248785924107])
    async def approvemoji_config(self, ctx: SlashContext, emoji):
        await ctx.send(content="This command is coming soon!")

    @cog_ext.cog_subcommand(base="config", name="reject-emoji", description="Configure the reject emoticon that should be used.",
                            options=[create_option(option_type=3, name="emoji", description="The emoji reject that should be used on the suggestion message.",
                                                   required=True)], guild_ids=[535089248785924107])
    async def rejectmoji_config(self, ctx: SlashContext, emoji):
        await ctx.send(content="This command is coming soon!")

    @cog_ext.cog_subcommand(base="config", name="staff-role", description="Configure the role that needs to be able to interact with suggestions, reports, polls and tickets.",
                            options=[create_option(option_type=8, name="role", description="The emoji reject that should be used on the suggestion message.",
                                                   required=True)], guild_ids=[535089248785924107])
    async def staffrole_config(self, ctx: SlashContext, role):
        await ctx.send(content="This command is coming soon!")

    @cog_ext.cog_subcommand(base="config", name="help", description="Obtain some more information about the config command.", guild_ids=[535089248785924107])
    async def help_config(self, ctx: SlashContext):
        await ctx.send(content="This command is coming soon!")


def setup(client):
    client.add_cog(Config(client))
