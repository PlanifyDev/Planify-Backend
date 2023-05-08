CREATE TABLE users (
    id          VARCHAR(100) PRIMARY KEY,
    firstname   VARCHAR(50) NOT NULL,
    lastname    VARCHAR(50) NOT NULL,
    image_url   VARCHAR(150) NOT NULL DEFAULT '',
    email       VARCHAR(100) UNIQUE NOT NULL,
    password    VARCHAR(100) NOT NULL,
    verified    BOOLEAN NOT NULL DEFAULT 'f',
    user_plan   VARCHAR(250) NOT NULL DEFAULT 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGFuX2lkIjoiMDNmZGJhMTE1MGNhNDRlMThiMTY5NDliOWZjYzc5OTUiLCJ1c2VyX2lkIjoiIiwiaWF0IjoxNjgyNTAzMjc5fQ.mDE7rW_u2ijC6s8DMnk9NIvqihJr1rS3k9VtXj-G82g',
    country     VARCHAR(50) NOT NULL DEFAULT 'Egypt',
    role        VARCHAR(50) NOT NULL DEFAULT 'user'
);

