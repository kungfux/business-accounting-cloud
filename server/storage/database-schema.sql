CREATE TABLE IF NOT EXISTS COMPANIES (
 [id]         INTEGER PRIMARY KEY AUTOINCREMENT,
 [name]       VARCHAR NOT NULL UNIQUE,
 [logo]       VARCHAR,
 [enabled]    BIT NOT NULL DEFAULT 0,
 [created]    DATE NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE TABLE IF NOT EXISTS TITLES (
 [id]         INTEGER PRIMARY KEY AUTOINCREMENT,
 [name]       VARCHAR NOT NULL,
 [rate]       FLOAT,
 [enabled]    BIT NOT NULL DEFAULT 0,
 [created]    DATE NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
 [companyId]  INTEGER NOT NULL
              REFERENCES COMPANIES(id)
              ON DELETE RESTRICT,
              CONSTRAINT uniq UNIQUE (name, companyId)
);

CREATE TABLE IF NOT EXISTS CONTACTS (
 [id]         INTEGER PRIMARY KEY AUTOINCREMENT,
 [name]       VARCHAR NOT NULL,
 [phone]      VARCHAR,
 [cellphone]  VARCHAR,
 [email]      VARCHAR,
 [address]    VARCHAR,
 [passport]   VARCHAR,
 [dob]        DATE,
 [note]       VARCHAR,
 [hired]      DATE,
 [fired]      DATE,
 [firedNote]  VARCHAR,
 [photo]      VARCHAR,
 [created]    DATE NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
 [titleId]    INTEGER
              REFERENCES TITLES(id)
              ON DELETE RESTRICT,
 [companyId]  INTEGER NOT NULL
              REFERENCES COMPANIES(id)
              ON DELETE RESTRICT,
              CONSTRAINT uniq UNIQUE (name, companyId)
);

CREATE TABLE IF NOT EXISTS PROPERTIES (
 [id]               INTEGER PRIMARY KEY AUTOINCREMENT,
 [title]            VARCHAR NOT NULL,
 [inventoryNumber]  VARCHAR,
 [cost]             FLOAT,
 [comment]          VARCHAR,
 [enabled]          BIT NOT NULL DEFAULT 0,
 [created]          DATE NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
 [companyId]        INTEGER NOT NULL
                    REFERENCES COMPANIES(id)
                    ON DELETE RESTRICT,
                    CONSTRAINT uniq UNIQUE (title, companyId)
);

CREATE TABLE IF NOT EXISTS EXPENDITURES (
 [id]           INTEGER PRIMARY KEY AUTOINCREMENT,
 [title]        VARCHAR NOT NULL,
 [rate]         FLOAT,
 [comment]      VARCHAR,
 [enabled]      BIT NOT NULL DEFAULT 0,
 [created]      DATE NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
 [companyId]    INTEGER NOT NULL
                REFERENCES COMPANIES(id)
                ON DELETE RESTRICT,
                CONSTRAINT uniq UNIQUE (title, companyId)
);

CREATE TABLE IF NOT EXISTS OPERATIONS (
 [id]             INTEGER PRIMARY KEY AUTOINCREMENT,
 [operationDate]  DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
 [amount]         FLOAT NOT NULL,
 [comment]        VARCHAR,
 [created]        DATE NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
 [contactId]      INTEGER
                  REFERENCES CONTACTS(id)
                  ON DELETE RESTRICT,
 [propertyId]     INTEGER
                  REFERENCES PROPERTIES(id)
                  ON DELETE RESTRICT,
 [expenditureId]  INTEGER
                  REFERENCES EXPENDITURES(id)
                  ON DELETE RESTRICT,
 [companyId]      INTEGER NOT NULL
                  REFERENCES COMPANIES(id)
                  ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS USERS (
 [id]       INTEGER PRIMARY KEY AUTOINCREMENT,
 [login]    VARCHAR NOT NULL UNIQUE,
 [name]     VARCHAR NOT NULL,
 [password] VARCHAR NOT NULL,
 [avatar]   VARCHAR,
 [salt]     VARCHAR NOT NULL,
 [admin]    BIT NOT NULL DEFAULT 0,
 [enabled]  BIT NOT NULL DEFAULT 0,
 [created]  DATE NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
)
