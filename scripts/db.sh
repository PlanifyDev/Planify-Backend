#!/bin/bash

# Connect to the Postgres server
psql -U postgres << EOF
CREATE DATABASE planify;
\c planify
\i ./migrations/user.sql
\i ./migrations/project.sql
\i ./migrations/payment.sql

EOF