from discord.ext import commands
from discord_slash import cog_ext, SlashContext
from discord_slash.utils.manage_commands import create_option


class Move(commands.Cog):
    def __init__(self, client):
        self.client = client

    @cog_ext.cog_slash(name="Move", description="Move a suggestion or report.", options=[
        create_option(option_type=3, name="id", description="The ID of the suggestion or report.",
                      required=True)
    ], guild_ids=[535089248785924107])
    async def move(self, ctx: SlashContext):
        await ctx.send(content="This command is coming soon!")


def setup(client):
    client.add_cog(Move(client))
