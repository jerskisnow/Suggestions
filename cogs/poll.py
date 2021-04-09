from discord.ext import commands
from discord_slash import cog_ext, SlashContext
from discord_slash.utils.manage_commands import create_option
from main import allowed_guilds


class Poll(commands.Cog):
    def __init__(self, client):
        self.client = client

    @cog_ext.cog_subcommand(base="poll", name="create", description="Create a new poll.", options=[
        create_option(option_type=7, name="channel", description="The channel where the poll should appear.", required=True),
        create_option(option_type=3, name="time", description="How long this poll should be active.", required=True),
        create_option(option_type=3, name="description", description="Give a brief description of the poll.", required=True)
    ], guild_ids=allowed_guilds)
    async def poll_create(self, ctx: SlashContext, channel, time, desc):
        await ctx.send(content="This command is coming soon!")

    @cog_ext.cog_subcommand(base="poll", name="end", description="End an active poll.", options=[
        create_option(option_type=3, name="id", description="The ID of the poll you want to end.", required=True)
    ], guild_ids=allowed_guilds)
    async def poll_end(self, ctx: SlashContext, poll_id):
        await ctx.send(content="This command is coming soon!")


def setup(client):
    client.add_cog(Poll(client))
