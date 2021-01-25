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

ALTER TABLE servers
ALTER COLUMN id TYPE TEXT,
ALTER COLUMN prefix TYPE TEXT,
ALTER COLUMN staff_role TYPE TEXT,
ALTER COLUMN suggestion_channel TYPE TEXT,
ALTER COLUMN report_channel TYPE TEXT,
ALTER COLUMN log_channel TYPE TEXT,
ALTER COLUMN approve_emoji TYPE TEXT,
ALTER COLUMN reject_emoji TYPE TEXT;