CREATE TABLE suggestions (
    id TEXT PRIMARY KEY NOT NULL, -- r_abc45
    context TEXT NOT NULL,
    author TEXT NOT NULL,
    channel TEXT NOT NULL,
    message TEXT NOT NULL,
    status INT NOT NULL,
    timestamp TIMESTAMP NOT NULL
)