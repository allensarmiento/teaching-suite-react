BEGIN TRANSACTION;

CREATE TABLE lessons (
  id serial PRIMARY KEY,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  title varchar(255) NOT NULL,
);

COMMIT;
