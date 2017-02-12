#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER crudns WITH PASSWORD 'password' CREATEDB;
    CREATE DATABASE crudns_dev;
    GRANT ALL PRIVILEGES ON DATABASE crudns_dev TO crudns;
EOSQL
