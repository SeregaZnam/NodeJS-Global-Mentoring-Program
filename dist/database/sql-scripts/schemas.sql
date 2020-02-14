CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id        uuid DEFAULT uuid_generate_v4() NOT NULL,
  login     varchar(40) NOT NULL,
  password  varchar(40) NOT NULL,
  age       integer,
  PRIMARY KEY(id)
);

CREATE TABLE groups (
    id              uuid DEFAULT uuid_generate_v4() NOT NULL,
    name            varchar(40) NOT NULL,
    permissions     varchar(40)[] NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE userGroup (
    id              uuid DEFAULT uuid_generate_v4() NOT NULL,
    userId          uuid NOT NULL,
    groupId         uuid NOT NULL,
    PRIMARY KEY(id)
);