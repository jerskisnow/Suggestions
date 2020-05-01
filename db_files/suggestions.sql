CREATE TABLE suggestions (
    id INT GENERATED ALWAYS AS IDENTITY,
	context TEXT NOT NULL,
	author VARCHAR(55) NOT NULL,
    guild VARCHAR(55) NOT NULL,
	channel VARCHAR(55) NOT NULL,
	message VARCHAR(55) NOT NULL,
	status VARCHAR(35) NOT NULL -- Open, Approved, Rejected
);
