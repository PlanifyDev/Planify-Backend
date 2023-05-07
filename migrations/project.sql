CREATE SEQUENCE projects START WITH 1;
CREATE TABLE project (
    id                    INTEGER PRIMARY KEY DEFAULT nextval('projects'),
    name                  VARCHAR(100) NOT NULL DEFAULT 'undefined' || nextval('projects'),
    boundary              JSON NOT NULL,
    door_position         JSON NOT NULL,
    -- neighbors             JSON NOT NULL,
    area                  FLOAT NOT NULL,
    project_img           VARCHAR(150) NOT NULL,
    project_icon          VARCHAR(150) NOT NULL,
    created_at            TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_trashed            BOOLEAN NOT NULL DEFAULT FALSE,
    user_id               VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE SEQUENCE versions START WITH 1;
CREATE TABLE version (
    id                       INTEGER PRIMARY KEY DEFAULT nextval('versions'),
    name                     VARCHAR(100) NOT NULL DEFAULT 'undefined' || nextval('projects'),
    version_img              VARCHAR(150) NOT NULL,
    version_icon             VARCHAR(150) NOT NULL,
    created_at               TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_trashed               BOOLEAN NOT NULL DEFAULT FALSE,
    constraints              JSON NOT NULL,
    project_id               INTEGER,
    FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
);
