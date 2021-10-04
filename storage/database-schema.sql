/* Pragma options */
-- Enable foreign_keys
PRAGMA foreign_keys = ON;

/* Tables init */
-- Companies
CREATE TABLE IF NOT EXISTS company (
    [id]        INTEGER PRIMARY KEY AUTOINCREMENT,
    [name]      NVARCHAR(45) NOT NULL UNIQUE,
    [created]   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);