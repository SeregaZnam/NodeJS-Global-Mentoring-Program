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

INSERT INTO userGroup (userId, groupId) VALUES
    ('9f228f13-bd44-4bed-9cb4-f070cefb8088', 'b634282a-5029-417a-a991-62521cb66721');