BEGIN TRANSACTION;

CREATE TABLE items (
  id serial PRIMARY KEY,
  slide_id INTEGER NOT NULL,
  FOREIGN KEY (slide_id) REFERENCES slides(id),
  number INTEGER NOT NULL,
  content varchar(255) NOT NULL,
  component varchar(255) NOT NULL
);

INSERT INTO items (slide_id, number, content, component)
VALUES (1, 1, 'Question 1', 'QuestionContent');

INSERT INTO items (slide_id, number, content, component)
VALUES (1, 2, 'Question 2', 'QuestionContent');

INSERT INTO items (slide_id, number, content, component)
VALUES (1, 3, 'Question 3', 'QuestionContent');

INSERT INTO items (slide_id, number, content, component)
VALUES (1, 4, 'Question 4', 'QuestionContent');

COMMIT;
