CREATE TABLE suggestions (
    id INT GENERATED ALWAYS AS IDENTITY,
    context TEXT NOT NULL,
    author TEXT NOT NULL,
    guild TEXT NOT NULL,
    channel TEXT NOT NULL,
    message TEXT NOT NULL,
    status INT NOT NULL,
    timestamp TIMESTAMP NOT NULL
)