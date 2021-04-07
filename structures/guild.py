from structures.cache import cache
from structures.postgresql import getcursor


class Guild:
    def __init__(self, guild_id):
        """
        :param guild_id: The ID of the guild
        """
        self.guild_id = guild_id

    async def get_setting(self, setting):
        """
        :param setting: The setting of the guild
        :type setting: str
        :return: The value of the given setting
        """
        if cache.exists_in_cache(self.guild_id):
            return cache.get_from_cache(self.guild_id)[setting]
        else:
            try:
                with getcursor() as cur:
                    cur.execute('SELECT * FROM guilds WHERE id = %'.format(setting=setting), self.guild_id)
                    guild_data = await cur.fetchone()
            except Exception as e:
                print("error in executing with exception: ", e)
            if guild_data is None:
                new_data = {"staff_role": None, "suggestion_channel": None, "report_channel": None}
                try:
                    with getcursor() as cur:
                        cur.execute(
                            'INSERT INTO guilds (id, staff_role, suggestion_channel, report_channel) VALUES (%, %, %, %)',
                            (
                                self.guild_id, None, None, None
                            )
                        )
                except Exception as e:
                    print("error in executing with exception: ", e)
                cache.set_in_cache(self.guild_id, new_data)
                return new_data[setting]
            else:
                cache.set_in_cache(self.guild_id, {"staff_role": guild_data.staff_role,
                                                   "suggestion_channel": guild_data.suggestion_channel,
                                                   "report_channel": guild_data.report_channel})
                # might not be correct so try this out
                return guild_data[setting]

    async def set_setting(self, setting, value):
        """
        :param setting: The setting of the guild
        :type setting: str
        :param value: The value of the setting that needs to be set
        """
        if cache.exists_in_cache(self.guild_id):
            old_cache = cache.get_from_cache(self.guild_id)
            old_cache[setting] = value
            cache.set_in_cache(self.guild_id, old_cache)
            try:
                with getcursor() as cur:
                    cur.execute('UPDATE guilds SET {table_name} = % WHERE id = %'.format(table_name=setting),
                                (value, self.guild_id))
            except Exception as e:
                print("error in executing with exception: ", e)
        else:
            try:
                with getcursor() as cur:
                    cur.execute('SELECT * FROM guilds WHERE id = %', self.guild_id)
                    guild_data = await cur.fetchone()
            except Exception as e:
                print("error in executing with exception: ", e)
            if guild_data is None:
                new_data = {"staff_role": None, "suggestion_channel": None, "report_channel": None, setting: value}
                try:
                    with getcursor() as cur:
                        cur.execute(
                            'INSERT INTO guilds (id, staff_role, suggestion_channel, report_channel) VALUES (%, %, %, %)',
                            (
                                self.guild_id, new_data["staff_role"], new_data["suggestion_channel"],
                                new_data["report_channel"]
                            )
                        )
                except Exception as e:
                    print("error in executing with exception: ", e)
                cache.set_in_cache(self.guild_id, new_data)
            else:
                try:
                    with getcursor() as cur:
                        cur.execute('UPDATE guilds SET {table_name} = % WHERE id = %'.format(table_name=setting),
                                    (value, self.guild_id))
                except Exception as e:
                    print("error in executing with exception: ", e)
                cache.set_in_cache(self.guild_id, {
                    "staff_role": guild_data.staff_role,
                    "suggestion_channel": guild_data.suggestion_channel,
                    "report_channel": guild_data.report_channel
                })
