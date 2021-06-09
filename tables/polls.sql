CREATE TABLE polls (
    id INT GENERATED ALWAYS AS IDENTITY,
    context TEXT NOT NULL,
    guild TEXT NOT NULL,
    channel TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL
)