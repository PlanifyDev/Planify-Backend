-- Active: 1675014913249@@127.0.0.1@5432@auth_service@public
CREATE SEQUENCE projects START WITH 1;
CREATE TABLE project (
    id                    INTEGER PRIMARY KEY DEFAULT nextval('projects'),
    name                  VARCHAR(100) NOT NULL,
    description           VARCHAR(250) NOT NULL,
    boundary              JSON NOT NULL,
    door_position         JSON NOT NULL,
    neighbors             JSON NOT NULL,
    constraints           JSON ,
    image_url             VARCHAR(150) NOT NULL,
    created_at            TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id               VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE SEQUENCE versions START WITH 1;
CREATE TABLE version (
    id                       INTEGER PRIMARY KEY DEFAULT nextval('versions'),
    version_num              INTEGER NOT NULL,
    name                     VARCHAR(100) NOT NULL,
    image_url                VARCHAR(150) NOT NULL,
    project_id               INTEGER,
    FOREIGN KEY (project_id) REFERENCES project(id)
);
