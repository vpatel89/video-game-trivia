DROP DATABASE IF EXISTS vgtrivialeaderboard;
CREATE DATABASE vgtrivialeaderboard;

\c vgtrivialeaderboard;

CREATE TABLE
  leaderboard(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    score INTEGER
);


-- sudo -u postgres psql < server/schema.sql