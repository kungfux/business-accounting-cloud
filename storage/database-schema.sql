CREATE TABLE IF NOT EXISTS PICTURE (
 [id]      INTEGER PRIMARY KEY AUTOINCREMENT,
 [picture] BLOB,
 [created] TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS COMPANY (
 [id]         INTEGER PRIMARY KEY AUTOINCREMENT,
 [name]       VARCHAR NOT NULL UNIQUE,
 [picture_id] INTEGER
              REFERENCES PICTURE(id)
              ON DELETE SET NULL,
 [created]    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS DOCUMENT (
 [id]       INTEGER PRIMARY KEY AUTOINCREMENT,
 [title]    VARCHAR NOT NULL,
 [comment]  VARCHAR,
 [document] BLOB NOT NULL,
 [created] TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS COMPANY_DOCUMENT (
 [id]          INTEGER PRIMARY KEY AUTOINCREMENT,
 [company_id]  INTEGER NOT NULL
               REFERENCES COMPANY(id)
               ON DELETE CASCADE,
 [document_id] INTEGER NOT NULL
               REFERENCES DOCUMENT(id)
               ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TITLE (
 [id]         INTEGER PRIMARY KEY AUTOINCREMENT,
 [name]       VARCHAR NOT NULL,
 [rate]       FLOAT,
 [billable]   BIT NOT NULL,
 [company_id] INTEGER NOT NULL
              REFERENCES COMPANY(id)
              ON DELETE CASCADE,
 [created]    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS CONTACT (
 [id]         INTEGER PRIMARY KEY AUTOINCREMENT,
 [name]       VARCHAR NOT NULL,
 [phone]      VARCHAR,
 [cellphone]  VARCHAR,
 [email]      VARCHAR,
 [address]    VARCHAR,
 [dob]        DATE,
 [note]       VARCHAR,
 [hired]      DATE,
 [fired]      DATE,
 [company_id] INTEGER NOT NULL
              REFERENCES COMPANY(id)
              ON DELETE CASCADE,
 [title_id]   INTEGER NOT NULL
              REFERENCES TITLE(id)
              ON DELETE SET NULL,
 [picture_id] INTEGER NOT NULL
              REFERENCES PICTURE(id)
              ON DELETE SET NULL,
 [created]    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS CONTACT_DOCUMENT (
 [id]          INTEGER PRIMARY KEY AUTOINCREMENT,
 [contact_id]  INTEGER NOT NULL
               REFERENCES CONTACT(id)
               ON DELETE CASCADE,
 [document_id] INTEGER NOT NULL
               REFERENCES DOCUMENT(id)
               ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PROPERTY (
 [id]               INTEGER PRIMARY KEY AUTOINCREMENT,
 [title]            VARCHAR NOT NULL,
 [inventory_number] VARCHAR,
 [comment]          VARCHAR,
 [company_id]       INTEGER NOT NULL
                    REFERENCES COMPANY(id)
                    ON DELETE CASCADE,
 [created]          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS PROPERTY_DOCUMENT (
 [id]          INTEGER PRIMARY KEY AUTOINCREMENT,
 [property_id] INTEGER NOT NULL
               REFERENCES PROPERTY(id)
               ON DELETE CASCADE,
 [document_id] INTEGER NOT NULL
               REFERENCES COMPANY(id)
               ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS EXPENDITURE (
 [id]           INTEGER PRIMARY KEY AUTOINCREMENT,
 [title]        VARCHAR NOT NULL,
 [default_cost] FLOAT,
 [company_id]   INTEGER NOT NULL
                REFERENCES COMPANY(id)
                ON DELETE CASCADE,
 [created]      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS OPERATION (
 [id]             INTEGER PRIMARY KEY AUTOINCREMENT,
 [when]           DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
 [amount]         FLOAT NOT NULL,
 [comment]        VARCHAR,
 [document_id]    INTEGER
                  REFERENCES DOCUMENT(id)
                  ON DELETE SET NULL,
 [contact_id]     INTEGER
                  REFERENCES CONTACT(id)
                  ON DELETE RESTRICT,
 [property_id]    INTEGER
                  REFERENCES PROPERTY(id)
                  ON DELETE RESTRICT,
 [expenditure_id] INTEGER
                  REFERENCES EXPENDITURE(id)
                  ON DELETE RESTRICT,
 [company_id]     INTEGER NOT NULL
                  REFERENCES COMPANY(id)
                  ON DELETE CASCADE,
 [created]        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
