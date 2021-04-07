from discord.ext import commands
from discord_slash import cog_ext, SlashContext
from discord_slash.utils.manage_commands import create_option


class Suggest(commands.Cog):
    def __init__(self, client):
        self.client = client

    @cog_ext.cog_slash(name="suggest", description="Suggest an idea for this server.", options=[
        create_option(option_type=3, name="description", description="A detailed description of your idea.",
                      required=True)
    ], guild_ids=[535089248785924107])
    async def suggest(self, ctx: SlashContext):
        await ctx.send(content="This command is coming soon!")


def setup(client):
    client.add_cog(Suggest(client))
