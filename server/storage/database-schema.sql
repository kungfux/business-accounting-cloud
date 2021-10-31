CREATE TABLE IF NOT EXISTS COMPANIES (
 [id]         INTEGER PRIMARY KEY AUTOINCREMENT,
 [name]       VARCHAR NOT NULL UNIQUE,
 [logo]       VARCHAR,
 [enabled]    BIT NOT NULL DEFAULT 0,
 [created]    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS TITLES (
 [id]         INTEGER PRIMARY KEY AUTOINCREMENT,
 [name]       VARCHAR NOT NULL,
 [rate]       FLOAT,
 [enabled]    BIT NOT NULL DEFAULT 0,
 [created]    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 [company_id] INTEGER NOT NULL
              REFERENCES COMPANIES(id)
              ON DELETE CASCADE,
              CONSTRAINT uniq UNIQUE (name, company_id)
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
 [fired_note] VARCHAR,
 [photo]      VARCHAR,
 [created]    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 [company_id] INTEGER NOT NULL
              REFERENCES COMPANIES(id)
              ON DELETE CASCADE,
 [title_id]   INTEGER
              REFERENCES TITLES(id)
              ON DELETE SET NULL,
              CONSTRAINT uniq UNIQUE (name, company_id)
);

CREATE TABLE IF NOT EXISTS PROPERTIES (
 [id]               INTEGER PRIMARY KEY AUTOINCREMENT,
 [title]            VARCHAR NOT NULL,
 [inventory_number] VARCHAR,
 [cost]             FLOAT,
 [comment]          VARCHAR,
 [enabled]          BIT NOT NULL DEFAULT 0,
 [created]          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 [company_id]       INTEGER NOT NULL
                    REFERENCES COMPANIES(id)
                    ON DELETE CASCADE,
                    CONSTRAINT uniq UNIQUE (title, company_id)
);

CREATE TABLE IF NOT EXISTS EXPENDITURES (
 [id]           INTEGER PRIMARY KEY AUTOINCREMENT,
 [title]        VARCHAR NOT NULL,
 [rate]         FLOAT,
 [comment]      VARCHAR,
 [enabled]      BIT NOT NULL DEFAULT 0,
 [created]      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 [company_id]   INTEGER NOT NULL
                REFERENCES COMPANIES(id)
                ON DELETE CASCADE,
                CONSTRAINT uniq UNIQUE (title, company_id)
);

CREATE TABLE IF NOT EXISTS OPERATIONS (
 [id]             INTEGER PRIMARY KEY AUTOINCREMENT,
 [when]           DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
 [amount]         FLOAT NOT NULL,
 [comment]        VARCHAR,
 [created]        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 [contact_id]     INTEGER
                  REFERENCES CONTACTS(id)
                  ON DELETE RESTRICT,
 [property_id]    INTEGER
                  REFERENCES PROPERTIES(id)
                  ON DELETE RESTRICT,
 [expenditure_id] INTEGER
                  REFERENCES EXPENDITURES(id)
                  ON DELETE RESTRICT,
 [company_id]     INTEGER NOT NULL
                  REFERENCES COMPANIES(id)
                  ON DELETE CASCADE
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
 [created]  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)
