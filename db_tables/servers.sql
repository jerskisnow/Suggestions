CREATE TABLE servers (
    id TEXT PRIMARY KEY NOT NULL,
    prefix TEXT NOT NULL,
    language TEXT NOT NULL,
    staff_role TEXT,
    suggestion_channel TEXT,
    report_channel TEXT,
    log_channel TEXT,
    auto_approve INT,
    auto_reject INT,
    approve_emoji TEXT,
    reject_emoji TEXT,
    delete_approved BOOLEAN,
    delete_rejected BOOLEAN,
    suggestion_blacklist TEXT,
    report_blacklist TEXT
);
