import datetime
import os
import time
from os import getenv

import discord
from discord.ext import commands
from discord_slash import SlashCommand
from dotenv import load_dotenv


def load_cogs(bot):
    for cog in [file.split(".")[0] for file in os.listdir("cogs") if file.endswith(".py")]:
        try:
            if cog != "__init__":
                bot.load_extension(f"cogs.{cog}")
        except Exception as ex:
            print(ex)


start_time = time.time()


class Client(commands.AutoShardedBot):
    def __init__(self):
        super().__init__(command_prefix=None)

        @self.event
        async def on_ready():
            await self.change_presence(
                activity=discord.Activity(name="v5.0.0", type=discord.ActivityType.watching))
            print(f"{self.user} initiated, at your service.")

        @self.event
        async def on_message(message):
            mention = f'<@!{self.user.id}>'
            if mention in message.content:
                current_time = time.time()
                difference = int(round(current_time - start_time))
                uptime = str(datetime.timedelta(seconds=difference))
                await message.channel.send("```asciidoc\n= Server Information =\n• Staffrole   :: {staff_role}\n\n"
                                           "= Bot Information =\n• Guilds      :: {guild_count}"
                                           "\n• Shards      :: {shard_count}\n• Uptime      :: {uptime}"
                                           "\n• Library     :: discord.py"
                                           "\n• Python      :: {python_version}```"
                                           .format(staff_role="None", guild_count=len(self.guilds),
                                                   shard_count=self.shard_count, uptime=uptime, python_version="3.8.4"))


if __name__ == "__main__":
    load_dotenv()

    client = Client()
    slash = SlashCommand(client, override_type=True, sync_commands=True)

    load_cogs(client)
    client.run(getenv("DISCORD_TOKEN"))
