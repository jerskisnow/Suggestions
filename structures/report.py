from enum import Enum
import discord
import secrets
import string

from structures.postgresql import getcursor


class Report:
    @classmethod
    def __init__(cls, report_id):
        """
        :param report_id: The ID of the (new) report
        :type report_id: str
        """
        cls.report_id = report_id

    @staticmethod
    def get_by_id(report_id):
        """
        :param report_id: The ID of the report
        :type report_id: str
        :return: The report associated with the given ID
        :rtype: Report
        """
        # TODO: ...
        return Report('131')

    @staticmethod
    def get_by_message_id(message_id):
        """
        :param message_id: The ID of the report's message
        :type message_id: int
        :return: The report associated with the given ID
        :rtype: Report
        """
        # TODO: ...
        return Report('awdawdwad2ed2131')

    def exists(self):
        """
        :return: True if report exists, False otherwise
        :rtype: bool
        """
        try:
            with getcursor() as cur:
                cur.execute('SELECT id FROM reports WHERE id = %', self.report_id)
                return cur.fetchone() is not None
        except Exception as e:
            print("error in executing with exception: ", e)

    @staticmethod
    def create_report(guild_id, author, channel, context):
        """
        :param guild_id: The ID of the guild
        :type guild_id: int
        :param author: The Author of the report
        :param channel: The channel where the report will be sent in
        :param context: The actual description of the report
        :type context: str
        :return: The report
        :rtype: Report
        """
        # Generate a pseudo-random string with s_ as prefix followed by ASCII Letters/Digits
        report_id = 's_'.join((secrets.choice(string.ascii_letters + string.digits) for i in range(8)))

        embed = discord.Embed(description=context, color=0x55aaee)
        embed.set_author(name=author.name, icon_url=author.avatar_url)
        embed.set_footer(text="Report ID: {report_id} - Open".format(report_id=report_id))

        msg = await channel.send(embed=embed)

        try:
            with getcursor() as cur:
                cur.execute("INSERT INTO reports (id, message, guild, channel, author, context, status) "
                            "VALUES (%, %, %, %, %, %, %)", (report_id, msg.id, guild_id, context, ReportStatus.OPEN))
        except Exception as e:
            print("error in executing with exception: ", e)

        return Report(report_id)

    def move(self, new_channel):
        # TODO: ...
        print('todo')

    def resolve(self):
        # TODO: ...
        print('todo')

    def delete(self):
        # TODO: ...
        print('todo')


class ReportStatus(Enum):
    OPEN = 0
    RESOLVED = 1
    DELETED = 2
