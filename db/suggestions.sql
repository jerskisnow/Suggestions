CREATE TABLE suggestions (
    id TEXT PRIMARY KEY NOT NULL,
    context TEXT NOT NULL,
    author BIGINT NOT NULL,
    guild BIGINT NOT NULL,
    channel BIGINT NOT NULL,
    message BIGINT NOT NULL,
    status INT NOT NULL
);