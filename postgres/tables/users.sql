BEGIN TRANSACTION;

CREATE TABLE users (
  id serial PRIMARY KEY,
  email text UNIQUE NOT NULL,
  password varchar(255) NOT NULL,
  role varchar(255),
  created TIMESTAMP NOT NULL,
);

COMMIT;
