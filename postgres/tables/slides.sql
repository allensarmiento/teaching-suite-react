BEGIN TRANSACTION;

CREATE TABLE slides (
  id serial PRIMARY KEY,
  lesson_id INTEGER NOT NULL,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id),
  number INTEGER NOT NULL,
  show_review BOOLEAN
);

COMMIT;
