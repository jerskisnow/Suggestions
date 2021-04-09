from discord.ext import commands
from discord_slash import cog_ext, SlashContext
from discord_slash.utils.manage_commands import create_option
from main import allowed_guilds


class Ticket(commands.Cog):
    def __init__(self, client):
        self.client = client

    @cog_ext.cog_subcommand(base="ticket", name="create", description="Create a new ticket.", guild_ids=allowed_guilds)
    async def create_ticket(self, ctx: SlashContext):
        await ctx.send(content="This command is coming soon!")

    @cog_ext.cog_subcommand(base="ticket", name="close", description="Close a ticket. (Ticket Owner / Staff)", guild_ids=allowed_guilds)
    async def close_ticket(self, ctx: SlashContext):
        await ctx.send(content="This command is coming soon!")

    @cog_ext.cog_subcommand(base="ticket", name="add", description="Add another user to the ticket. (Ticket Owner / Staff)",
                            options=[create_option(option_type=7, name="user", description="The user you want to add to the current ticket.",
                                                   required=True)], guild_ids=allowed_guilds)
    async def add_ticket(self, ctx: SlashContext):
        await ctx.send(content="This command is coming soon!")


def setup(client):
    client.add_cog(Ticket(client))
