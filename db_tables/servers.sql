CREATE TABLE servers (
    id VARCHAR(18) PRIMARY KEY NOT NULL,
    prefix VARCHAR(4) NOT NULL,
    language VARCHAR(15) NOT NULL,
    staff_role VARCHAR(18),
    suggestion_channel VARCHAR(18),
    report_channel VARCHAR(18),
    log_channel VARCHAR(18),
    auto_approve INT,
    auto_reject INT,
    approve_emoji VARCHAR(18),
    reject_emoji VARCHAR(18),
    delete_approved BOOLEAN,
    delete_rejected BOOLEAN,
    suggestion_blacklist TEXT,
    report_blacklist TEXT,
    disabled BOOLEAN,
    disable_reason TEXT
);