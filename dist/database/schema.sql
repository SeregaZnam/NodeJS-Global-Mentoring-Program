CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id        uuid DEFAULT uuid_generate_v4() NOT NULL,
  login     varchar(40) NOT NULL,
  password  varchar(40) NOT NULL,
  age       integer,
  PRIMARY KEY(id)
)
