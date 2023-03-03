-- Active: 1675733762916@@planify.ccjo9gy5a6ho.eu-central-1.rds.amazonaws.com@5432@planify@public
CREATE TABLE plans (
    plan_id      VARCHAR(100) PRIMARY KEY,
    name                    VARCHAR(50) UNIQUE NOT NULL,
    description             VARCHAR(200) NOT NULL,
    suggestions             NUMERIC NOT NULL,
    dwg_file                BOOLEAN NOT NULL,
    design_3D               BOOLEAN NOT NULL,
    edit_design             BOOLEAN NOT NULL,
    monthly_price           NUMERIC NOT NULL,
    yearly_price            NUMERIC NOT NULL
);

INSERT INTO plans VALUES('03fdba11-50ca-44e1-8b16-949b9fcc7995', 'basic', 'free plan', 3, 'false', 'false', 'false' , 0, 0);
INSERT INTO plans VALUES('85be656d-a9a8-4a0e-ae78-8b0f005f5fd2', 'premium', 'premium plan', 50, 'true', 'true', 'true', 0.01, 10);

CREATE TABLE payment (
    payment_id              VARCHAR(100) PRIMARY KEY,
    payment_description     VARCHAR(200) ,
    amount                  NUMERIC NOT NULL,
    currency                VARCHAR(50) NOT NULL DEFAULT 'USD',
    created_date            DATE NOT NULL DEFAULT CURRENT_DATE,
    payment_details         JSON NOT NULL,
    payment_status          VARCHAR(50) NOT NULL,
    user_id                 VARCHAR(100) NOT NULL,
    plan_id                 VARCHAR(100) NOT NULL,
    subscription            VARCHAR(50) NOT NULL,
    FOREIGN KEY (plan_id)   REFERENCES plans(plan_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id)   REFERENCES users(id) ON DELETE CASCADE,
    payer_id                VARCHAR(100) DEFAULT NULL
);

