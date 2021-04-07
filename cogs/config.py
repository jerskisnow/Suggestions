from discord.ext import commands
from discord_slash import cog_ext, SlashContext
from discord_slash.utils.manage_commands import create_option


class Config(commands.Cog):
    def __init__(self, client):
        self.client = client

    @cog_ext.cog_slash(name="Config", description="Modify the bot's configuration for your server.",
                       guild_ids=[535089248785924107])
    async def config(self, ctx: SlashContext):
        await ctx.send(content="This command is coming soon!")

    @cog_ext.cog_subcommand(base="Config", name="Suggestion Channel", description="Configure the suggestion channel.",
                            options=[
                                create_option(option_type=3, name="Channel",
                                              description="The channel where suggestions should appear.", required=True)
                            ], guild_ids=[535089248785924107])
    async def sugchannel_config(self, ctx: SlashContext):
        await ctx.send(content="This command is coming soon!")


def setup(client):
    client.add_cog(Config(client))
