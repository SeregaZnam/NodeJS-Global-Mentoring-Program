INSERT INTO users (login, password, age) VALUES
    ('Alex', '123test', 15),
    ('Robin', 'asd456A', 20),
    ('Tony', 'sdf98xA', 25),
    ('Andrey', 'sdf298xA', 45),
    ('Sergey', '123wer', 25);

INSERT INTO groups (name, permissions) VALUES
    ('Group1', ARRAY ['READ']),
    ('Group1', ARRAY ['READ', 'WRITE']),
    ('Group2', ARRAY ['READ', 'WRITE', 'DELETE']),
    ('Group3', ARRAY ['READ', 'WRITE', 'DELETE', 'SHARE']),
    ('Group4', ARRAY ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']);