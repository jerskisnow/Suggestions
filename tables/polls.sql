CREATE TABLE IF NOT EXISTS polls (
    id TEXT PRIMARY KEY NOT NULL, -- p_abc45
    context TEXT NOT NULL,
    channel TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL
)