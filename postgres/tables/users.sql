BEGIN TRANSACTION;

CREATE TABLE users (
  id serial PRIMARY KEY,
  email text UNIQUE NOT NULL,
  password varchar(255) NOT NULL,
  role varchar(255),
  created TIMESTAMP NOT NULL
);

INSERT INTO users (email, password, role, created)
VALUES (
  'test@test.com', 
  '2d588d736825a13566beb5639d32296a27175ca7db735badf06f0c2d62ae0666fa4e9b23e56208a6142fc68d5939b0f0f46dfb46e346e28a8e333f1c50379419.9669237953263153',
  'teacher',
  '2021-07-04T08:50:26.000Z'
);

COMMIT;
