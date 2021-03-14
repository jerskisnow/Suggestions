CREATE TABLE reports (
    id INT GENERATED ALWAYS AS IDENTITY,
    context TEXT NOT NULL,
    author TEXT NOT NULL,
    guild TEXT NOT NULL,
	channel TEXT NULL,
	message TEXT NOT NULL,
	status INT NOT NULL
);
