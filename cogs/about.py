import discord
from discord.ext import commands
from discord_slash import cog_ext, SlashContext


class About(commands.Cog):
    def __init__(self, client):
        self.client = client

    @cog_ext.cog_slash(name="about", description="Obtain general information about the bot.",
                       guild_ids=[535089248785924107])
    async def about(self, ctx: SlashContext):
        embed = discord.Embed(description="", color=0x55aaee)
        embed.add_field(name="Project - Suggestions",
                        value="Suggestions is a discord bot, created by CodedSnow, that allows for perfect collaboration between members and staff members. "
                              "Members can create their ideas, a staff member can then approve, consider or reject them. "
                              "Suggestions also allows people to create a Report. This is useful for example for Gaming servers where a player needs to be reported or a support server where you can report bugs.\n\n"
                              "You can invite Suggestions to your own server by clicking [here](https://top.gg/bot/566616056165302282/invite/).",
                        inline=False)
        embed.add_field(name="Voting", value="Voting for Suggestions is a great way of supporting our project. "
                                             "Voting for Suggestions will make it appear higher in de botlists, "
                                             "making it grow even faster! \n\nYou can vote for suggestions by clicking [here](https://top.gg/bot/566616056165302282/vote).",
                        inline=False)
        embed.add_field(name="Donating",
                        value="Don't feel obligated to donate! It isn't a requirement but it helps us to maintenance our projects including Suggestions.\n\n"
                              "If you decided to donate contact jerskisnow#8214 if you want to receive a premium rank, based on the amount you donated, on the official CodedSnow discord server! "
                              "When you received a premium rank you'll receive some extra perks and you'll be thanked gratefully!\n\n"
                              "You can go to our [wiki](https://github.com/jerskisnow/Suggestions/wiki/Donating) in order to find more information about donating including the payment details.",
                        inline=False)
        await ctx.send(embed=embed)


def setup(client):
    client.add_cog(About(client))
