CREATE TABLE servers (
    id BIGINT PRIMARY KEY NOT NULL,
    staff_role BIGINT,
    suggestion_channel BIGINT,
    report_channel BIGINT,
    log_channel BIGINT,
    auto_approve INT,
    auto_reject INTEGER,
    approve_emoji TEXT,
    reject_emoji TEXT,
    delete_approved BOOLEAN,
    delete_rejected BOOLEAN,
    suggestion_blacklist TEXT,
    report_blacklist TEXT
);