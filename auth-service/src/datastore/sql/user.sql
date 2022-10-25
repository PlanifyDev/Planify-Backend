CREATE TABLE users (
    id          VARCHAR(100) PRIMARY KEY,
    first_name  VARCHAR(50) NOT NULL,
    last_name   VARCHAR(50) NOT NULL,
    image_url   VARCHAR(150) NOT NULL,
    user_name   VARCHAR(100) UNIQUE NOT NULL,
    email       VARCHAR(100) UNIQUE NOT NULL,
    password    VARCHAR(100) NOT NULL
    verified    BOOLEAN NOT NULL DEFAULT f
);
