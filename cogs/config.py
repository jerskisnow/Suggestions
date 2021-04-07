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


def setup(client):
    client.add_cog(Config(client))
