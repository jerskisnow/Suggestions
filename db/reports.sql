CREATE TABLE reports (
    id TEXT PRIMARY KEY NOT NULL,
    context TEXT NOT NULL,
    author BIGINT NOT NULL,
    guild BIGINT NOT NULL,
    channel BIGINT NULL,
    message BIGINT NOT NULL,
    status INT NOT NULL
);