DROP TABLE IF EXISTS tasks CASCADE;

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY
    title TEXT NOT NULL UNIQUE
    status BOOLEAN DEFAULT FALSE
)

INSERT INTO tasks(title, status) VALUES
    ('Cleaning', FALSE),
    ('Cooking' TRUE),
    ('seeing', TRUE),
    ('idk', FALSE);