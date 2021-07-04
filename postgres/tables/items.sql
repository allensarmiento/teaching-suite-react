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
VALUES (1, 1, 'Question 1.1', 'QuestionContent');

INSERT INTO items (slide_id, number, content, component)
VALUES (1, 2, 'Question 1.2', 'QuestionContent');

INSERT INTO items (slide_id, number, content, component)
VALUES (1, 3, 'Question 1.3', 'QuestionContent');

INSERT INTO items (slide_id, number, content, component)
VALUES (1, 4, 'Question 1.4', 'QuestionContent');

INSERT INTO items (slide_id, number, content, component)
VALUES (2, 1, 'Question 2.1', 'QuestionContent');

INSERT INTO items (slide_id, number, content, component)
VALUES (2, 2, 'Question 2.2', 'QuestionContent');

INSERT INTO items (slide_id, number, content, component)
VALUES (2, 3, 'Question 2.3', 'QuestionContent');

INSERT INTO items (slide_id, number, content, component)
VALUES (2, 4, 'Question 2.4', 'QuestionContent');

INSERT INTO items (slide_id, number, content, component)
VALUES (3, 1, 'Text 3.1', 'TextContent');

INSERT INTO items (slide_id, number, content, component)
VALUES (3, 2, 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80', 'ImageContent');

INSERT INTO items (slide_id, number, content, component)
VALUES (4, 1, 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80', 'ImageContent');

INSERT INTO items (slide_id, number, content, component)
VALUES (4, 2, 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80', 'ImageContent');

INSERT INTO items (slide_id, number, content, component)
VALUES (5, 1, 'Text 2.1', 'TextContent');

COMMIT;
