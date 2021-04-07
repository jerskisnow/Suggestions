from discord.ext import commands
from discord_slash import cog_ext, SlashContext


class Help(commands.Cog):
    def __init__(self, client):
        self.client = client

    @cog_ext.cog_slash(name="help", description="Obtain information about the commands.",
                       guild_ids=[535089248785924107])
    async def help(self, ctx: SlashContext):
        await ctx.send(content="```asciidoc\n== Commands ==\n[Use /<command> for a more detailed explanation of that particular command.]"
                               "\n\n= User ="
                               "\n/suggest    :: Create a suggestion for this server."
                               "\n/report     :: Create a report for this server."
                               "\n/allowdm    :: Toggle whether or not the bot should send you a DM when creating a suggestion/report."
                               "\n/about      :: Obtain information about this bot."
                               "\n/help       :: Shows this particular help message."
                               "\n\n= Staff ="
                               "\n/setstatus  :: Change the status of a Suggestion or Report. (Approve/Consider/Reject/Resolve)"
                               "\n/move       :: Move a suggestion or report to another channel."
                               "\n/reject     :: Reject a community made suggestion for your server."
                               "\n\n= Admin ="
                               "\n/setup      :: Setup the bot. (This will set the staffrole and suggestion channel)"
                               "\n/config     :: Modify the bot's configuration for your server."
                               "\n/blacklist  :: Prevent someone from creating suggestions and/or reports.```")


def setup(client):
    client.add_cog(Help(client))
