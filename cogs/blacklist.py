from discord.ext import commands
from discord_slash import cog_ext, SlashContext
from discord_slash.utils.manage_commands import create_option


class Blacklist(commands.Cog):
    def __init__(self, client):
        self.client = client

    @cog_ext.cog_subcommand(base="blacklist", name="add", description="Add someone to the blacklist.",
                            options=[create_option(option_type=6, name="user", description="The user that should be blacklisted.", required=True),
                                     create_option(option_type=3, name="blacklist", description="Add this user to the suggestions, reports or both blacklists.", required=False)],
                            guild_ids=[535089248785924107])
    async def add_blacklist(self, ctx: SlashContext, user, blacklist):
        # when list is not given then ban user from both
        await ctx.send(content="This command is coming soon!")

    @cog_ext.cog_subcommand(base="blacklist", name="remove", description="Remove someone from the blacklist.",
                            options=[create_option(option_type=6, name="user", description="The user that should be removed from the blacklist.", required=True),
                                     create_option(option_type=3, name="blacklist", description="Remove this user to the suggestions, reports or both blacklists.", required=False)],
                            guild_ids=[535089248785924107])
    async def remove_blacklist(self, ctx: SlashContext, user, blacklist):
        # when list is not given then remove user from both if that's the case
        await ctx.send(content="This command is coming soon!")

    @cog_ext.cog_subcommand(base="blacklist", name="info", description="Get a list of blacklisted people.", guild_ids=[535089248785924107])
    async def logchannel_config(self, ctx: SlashContext):
        # 3 colums, one with suggestion blacklisted people, one with report blacklisted people and one with both (so no duplicates)
        await ctx.send(content="This command is coming soon!")


def setup(client):
    client.add_cog(Blacklist(client))
