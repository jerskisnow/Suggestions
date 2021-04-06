from enum import Enum
import discord
import secrets
import string

from structures.postgresql import getcursor


class Suggestion:
    @classmethod
    def __init__(cls, suggestion_id):
        """
        :param suggestion_id: The ID of the (new) suggestion
        :type suggestion_id: str
        """
        cls.suggestion_id = suggestion_id

    @staticmethod
    def get_by_id(suggestion_id):
        """
        :param suggestion_id: The ID of the suggestion
        :type suggestion_id: str
        :return: The suggestion associated with the given ID
        :rtype: Suggestion
        """
        # TODO: ...
        return Suggestion('131')

    @staticmethod
    def get_by_message_id(message_id):
        """
        :param message_id: The ID of the suggestion's message
        :type message_id: int
        :return: The suggestion associated with the given ID
        :rtype: Suggestion
        """
        # TODO: ...
        return Suggestion('awdawdwad2ed2131')

    def exists(self):
        """
        :return: True if suggestion exists, False otherwise
        :rtype: bool
        """
        try:
            with getcursor() as cur:
                cur.execute('SELECT id FROM suggestions WHERE id = %', self.suggestion_id)
                return cur.fetchone() is not None
        except Exception as e:
            print("error in executing with exception: ", e)

    @staticmethod
    def create_suggestion(guild_id, author, channel, context):
        """
        :param guild_id: The ID of the guild
        :type guild_id: int
        :param author: The Author of the suggestion
        :param channel: The channel where the suggestion will be sent in
        :param context: The actual description of the suggestion
        :type context: str
        :return: The suggestion
        :rtype: Suggestion
        """
        # Generate a pseudo-random string with s_ as prefix followed by ASCII Letters/Digits
        suggestion_id = 's_'.join((secrets.choice(string.ascii_letters + string.digits) for i in range(8)))

        embed = discord.Embed(description=context, color=0x55aaee)
        embed.set_author(name=author.name, icon_url=author.avatar_url)
        embed.set_footer(text="Suggestion ID: {suggestion_id} - Open".format(suggestion_id=suggestion_id))

        msg = await channel.send(embed=embed)

        try:
            with getcursor() as cur:
                cur.execute("INSERT INTO suggestions (id, message, guild, channel, author, context, status) "
                            "VALUES (%, %, %, %, %, %, %)", (suggestion_id, msg.id, guild_id, context, SuggestionStatus.OPEN))
        except Exception as e:
            print("error in executing with exception: ", e)

        return Suggestion(suggestion_id)

    def move(self, new_channel):
        # TODO: ...
        print('todo')

    def approve(self):
        # TODO: ...
        print('todo')

    def consider(self):
        print('todo')

    def reject(self):
        print('todo')

    def delete(self):
        print('todo')


class SuggestionStatus(Enum):
    OPEN = 0
    APPROVED = 1
    UNDER_CONSIDERATION = 2
    REJECTED = 3
    DELETED = 4
