import redis
import json
from contextlib import contextmanager


cache = redis.Redis()


@contextmanager
def exists_in_cache(guild_id):
    """
    :param guild_id: The ID of the guild
    :type guild_id: int
    :return: Wether the guild exists in the cache
    :rtype: bool
    """
    return cache.exists(guild_id)


@contextmanager
def get_from_cache(guild_id):
    """
    :param guild_id: The ID of the guild
    :type guild_id: int
    :return: The cache object
    """
    return json.loads(cache.get(guild_id))


@contextmanager
def set_in_cache(guild_id, data):
    """
    :param guild_id: The ID of the guild
    :type guild_id: int
    :param data: The data to store into the cache
    """
    cache.setex(guild_id, 28800, json.dumps(data))


@contextmanager
def remove_from_cache(guild_id):
    """
    :param guild_id: The ID of the guild
    :type guild_id: int
    """
    cache.delete(guild_id)
