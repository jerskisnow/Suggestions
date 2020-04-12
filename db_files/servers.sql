CREATE TABLE servers (
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    prefix VARCHAR(25) NOT NULL,
    language VARCHAR(25) NOT NULL,
    channel VARCHAR(55),
    auto_approve INT,
    auto_reject INT,
    delete_approved BOOLEAN,
    delete_rejected BOOLEAN
);
