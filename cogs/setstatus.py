from discord.ext import commands
from discord_slash import cog_ext, SlashContext
from discord_slash.utils.manage_commands import create_option
from structures.suggestion import Suggestion
from structures.report import Report
from main import allowed_guilds


class SetStatus(commands.Cog):
    def __init__(self, client):
        self.client = client

    @cog_ext.cog_slash(name="setstatus", description="Change the status of a suggestion or report.",
                            options=[create_option(option_type=3, name="id", description="The ID of the suggestion or report.", required=True),
                                     create_option(option_type=3, name="reason", description="A brief reason.", required=False)], guild_ids=allowed_guilds)
    async def setstatus(self, ctx: SlashContext, id: str, reason: str):
        if id.startsWith('s_'):
            sug = Suggestion.get_by_id(id)
            # get suggestion from database
        elif id.startswith('r_'):
            rep = Report.get_by_id(id)
            # get report from database
        else:
            return ctx.send(content="There is not suggestion or report with that idea. Try copying the ID from the message's footer. (Case-Sensitive)")


def setup(client):
    client.add_cog(SetStatus(client))
