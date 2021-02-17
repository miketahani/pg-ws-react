# postgres (pg_notify) + websockets + React

Simple proof of concept (apologies for poor code quality and shortcuts) to get realtime notifications from user actions that cause changes in a DB. Prototype for a project that was never released.

### Run

Somewhat convoluted right now. I may bake this into a script at some point.

- Start a postgres server. Your credentials will be read from the commandline:

```
The default values for the environment variables used are:
PGHOST='localhost'
PGUSER=process.env.USER
PGDATABASE=process.env.USER
PGPASSWORD=null
PGPORT=5432
```
- Populate the DB: `psql -d $DB_NAME -f db.sql` (replace `$DB_NAME`)
- `cd $REPO_ROOT/server`
- Start two processes: `node server`, `node ws`
- `cd $REPO_ROOT/app && npm start`
