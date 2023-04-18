#!/bin/bash

# Connect to the Postgres server
psql -p 5432 -U postgres << EOF
CREATE DATABASE planify;
\c planify
\i ./user.sql
\i ./project.sql
\i ./payment.sql

EOF