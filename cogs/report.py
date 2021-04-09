from discord.ext import commands
from discord_slash import cog_ext, SlashContext
from discord_slash.utils.manage_commands import create_option
from main import allowed_guilds


class Report(commands.Cog):
    def __init__(self, client):
        self.client = client

    @cog_ext.cog_slash(name="Report", description="Create a report for this server.", options=[
        create_option(option_type=3, name="description", description="A detailed description of your report.",
                      required=True)
    ], guild_ids=allowed_guilds)
    async def report(self, ctx: SlashContext):
        await ctx.send(content="This command is coming soon!")


def setup(client):
    client.add_cog(Report(client))
