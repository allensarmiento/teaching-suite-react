BEGIN TRANSACTION;

CREATE TABLE items (
  id serial PRIMARY KEY,
  slide_id INTEGER NOT NULL,
  FOREIGN KEY (slide_id) REFERENCES slides(id),
  number INTEGER NOT NULL,
  content varchar(255) NOT NULL,
  component varchar(255) NOT NULL
);

COMMIT;
