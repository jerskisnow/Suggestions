from discord.ext import commands
from discord_slash import cog_ext, SlashContext
from discord_slash.utils.manage_commands import create_option


class Poll(commands.Cog):
    def __init__(self, client):
        self.client = client

    @cog_ext.cog_slash(name="Poll", description="Manage polls for your server.", guild_ids=[535089248785924107])
    async def poll(self, ctx: SlashContext):
        await ctx.send(content="This command is coming soon!")

    @cog_ext.cog_subcommand(base="Poll", name="create", description="Create a new poll.", options=[
        create_option(option_type=7, name="Channel", description="The channel where the poll should appear.", required=True),
        create_option(option_type=3, name="Time", description="How long this poll should be active.", required=True),
        create_option(option_type=3, name="Description", description="Give a brief description of the poll.", required=True)
    ], guild_ids=[535089248785924107])
    async def poll_create(self, ctx: SlashContext):
        await ctx.send(content="This command is coming soon!")

    @cog_ext.cog_subcommand(base="Poll", name="end", description="End an active poll.", options=[
        create_option(option_type=3, name="ID", description="The ID of the poll you want to end.", required=True)
    ], guild_ids=[535089248785924107])
    async def poll_end(self, ctx: SlashContext):
        await ctx.send(content="This command is coming soon!")


def setup(client):
    client.add_cog(Poll(client))
