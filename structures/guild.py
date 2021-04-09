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
        :return: The value of the given setting or None when setting is not set
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
                try:
                    with getcursor() as cur:
                        cur.execute('INSERT INTO guilds (id) VALUES (%)', self.guild_id)
                except Exception as e:
                    print("error in executing with exception: ", e)
                return None
            else:
                data = {}
                for s in guild_data:
                    data[s] = guild_data[s]
                # Cache all data we could fetch to reduce pressure
                cache.set_in_cache(self.guild_id, data)

                # return the value that we actually needed (this could still be None if the value we needed is not set)
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
                try:
                    with getcursor() as cur:
                        cur.execute('INSERT INTO guilds (id, {table_name}) VALUES (%, %)'.format(table_name=setting),
                                    (self.guild_id, value))
                except Exception as e:
                    print("error in executing with exception: ", e)
                # No actual data exists so just add the value we set in the cache
                cache.set_in_cache(self.guild_id, {setting: value})
            else:
                try:
                    with getcursor() as cur:
                        # Update the value in the database
                        cur.execute('UPDATE guilds SET {table_name} = % WHERE id = %'.format(table_name=setting),
                                    (value, self.guild_id))
                except Exception as e:
                    print("error in executing with exception: ", e)
                data = {}
                for s in guild_data:
                    data[s] = guild_data[s]
                # Cache all data we could fetch
                cache.set_in_cache(self.guild_id, data)

    async def add_to_blacklist(self, user_id, blacklist):
        print('todo')

    async def remove_from_blacklist(self, user_id, blacklist):
        print('todo')
