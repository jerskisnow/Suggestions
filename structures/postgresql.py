from contextlib import contextmanager
from os import getenv

from psycopg2.pool import SimpleConnectionPool

dbConnection = "dbname='{db_name}' user='{db_user}' host='{db_host}' password='{db_password}'" \
    .format(db_name=getenv("DATABASE_NAME"), db_user=getenv("DATABASE_USER"),
            db_host=getenv("DATABASE_HOST"), db_password=getenv("DATABASE_PASSWORD"))

# pool define with 10 live connections
connectionpool = SimpleConnectionPool(1, 10, dsn=dbConnection)


@contextmanager
def getcursor():
    con = connectionpool.getconn()
    try:
        yield con.cursor()
    finally:
        connectionpool.putconn(con)
