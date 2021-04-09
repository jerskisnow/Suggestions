from discord.ext import commands
from discord_slash import cog_ext, SlashContext
import matplotlib.pyplot as plt
import discord
import datetime
import pandas as pd
import numpy as np
import os
from main import allowed_guilds


class Graph(commands.Cog):
    def __init__(self, client):
        self.client = client

    @cog_ext.cog_slash(name="graph", description="Obtain a graph related to the amount of suggestions in this server.",
                       guild_ids=allowed_guilds)
    async def graph(self, ctx: SlashContext):
        msg = await ctx.send('Loading graph...')

        # TODO: Makes sure this uses real data
        date_list = [datetime.datetime.now() - datetime.timedelta(days=x) for x in range(0, 10)]
        score_list = list(np.random.randint(low=1, high=25, size=10))

        df = pd.DataFrame()

        # Create a column from the datetime variable
        df['datetime'] = date_list
        # Convert that column into a datetime datatype
        df['datetime'] = pd.to_datetime(df['datetime'])
        # Set the datetime column as the index
        df.index = df['datetime']
        # Create a column from the numeric score variable
        df['amount'] = score_list

        df.resample('M').sum()

        values = df.values.tolist()

        x = []
        y = []
        for v in values:
            x.append(v[0])
            y.append(v[1])

        fig = plt.figure()
        fig.patch.set_facecolor('#2f3136')

        ax = fig.add_subplot(111)

        ax.plot(x, y, '#55aaee')
        plt.gcf().autofmt_xdate()

        ax.patch.set_facecolor('#2f3136')
        ax.spines['left'].set_color('#dcddde')
        ax.spines['right'].set_color('#dcddde')
        ax.spines['bottom'].set_color('#dcddde')
        ax.spines['top'].set_color('#dcddde')
        ax.tick_params(colors='#dcddde', which='both')
        plt.savefig("graphs/{guild_id}.png".format(guild_id=ctx.guild_id), bbox_inches='tight')
        plt.close()

        file = discord.File(fp="graphs/{guild_id}.png".format(guild_id=ctx.guild_id))

        embed = discord.Embed(title="Suggestions - Graph",
                              description="Currently a total of {total_count} suggestions were made. "
                                          "{open_count} of these are currently open.\n\n"
                                          "See the graph below for a compiled overview."
                              .format(total_count=15, open_count=2), color=0x55aaee)
        embed.set_image(url="attachment://{guild_id}.png".format(guild_id=ctx.guild_id))
        await ctx.channel.send(file=file, embed=embed)
        await msg.edit(content="Graph loaded.")

        os.remove("graphs/{guild_id}.png".format(guild_id=ctx.guild_id))


def setup(client):
    client.add_cog(Graph(client))
