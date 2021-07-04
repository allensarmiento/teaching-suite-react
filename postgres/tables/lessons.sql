BEGIN TRANSACTION;

CREATE TABLE lessons (
  id serial PRIMARY KEY,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  title varchar(255) NOT NULL,
  created TIMESTAMP NOT NULL
);

INSERT INTO lessons (user_id, title, created)
VALUES (
  1,
  'Lesson 1',
  '2021-07-04T08:50:26.000Z'
);

INSERT INTO lessons (user_id, title, created)
VALUES (
  1,
  'Lesson 2',
  '2021-07-04T08:50:26.000Z'
);

COMMIT;
