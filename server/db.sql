CREATE TABLE IF NOT EXISTS foo (id serial primary key, name varchar);

-- CREATE OR REPLACE FUNCTION notify_trigger() RETURNS trigger AS $$
-- DECLARE
-- BEGIN
--   PERFORM pg_notify('watchers', row_to_json(NEW)::text);
--   RETURN NULL;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER watched_table_trigger AFTER INSERT ON foo
-- FOR EACH ROW EXECUTE PROCEDURE notify_trigger();

-- -- testing sending diff instead of full record
-- CREATE OR REPLACE FUNCTION notify_change_trigger() RETURNS trigger AS $$
-- DECLARE
-- BEGIN
--   PERFORM pg_notify('watchers',
--     json_build_object(
--       'meta', json_build_object('table', TG_TABLE_NAME, 'type', TG_OP),
--       'prev', row_to_json(OLD),
--       'diff', hstore(NEW) - hstore(OLD)
--     )::text
--   );
--   RETURN NULL;
-- END;
-- $$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION notify_change_trigger() RETURNS trigger AS $$
DECLARE
BEGIN
  -- PERFORM pg_notify('watchers', row_to_json(NEW)::text);
  PERFORM pg_notify('watchers',
    json_build_object(
      -- 'rows': <select all rows from the changed table here> FIXME performance, should we have
      --          a different websocket that handles hydration so we can control how data gets
      --          retrieved (conditionally, from caches, paginated, etc) instead of passing around
      --          the entire contents of the table when one row changes?
      'meta', json_build_object('table', TG_TABLE_NAME, 'type', TG_OP),
      'row', row_to_json(
        CASE TG_OP
          WHEN 'INSERT' THEN NEW
          WHEN 'UPDATE' THEN NEW
          WHEN 'DELETE' THEN OLD
          ELSE OLD
        END
      )
    )::text
  );
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER foo_change_trigger AFTER INSERT OR UPDATE OR DELETE ON foo
FOR EACH ROW EXECUTE PROCEDURE notify_change_trigger();

-- CREATE TRIGGER foo_insert_trigger AFTER INSERT ON foo
-- FOR EACH ROW EXECUTE PROCEDURE notify_change_trigger();

-- CREATE TRIGGER foo_update_trigger AFTER UPDATE ON foo
-- FOR EACH ROW EXECUTE PROCEDURE notify_change_trigger();

-- CREATE TRIGGER foo_delete_trigger AFTER DELETE ON foo
-- FOR EACH ROW EXECUTE PROCEDURE notify_change_trigger();

-- CREATE OR REPLACE FUNCTION notify_delete_trigger() RETURNS trigger AS $$
-- DECLARE
-- BEGIN
--   -- PERFORM pg_notify('watchers', row_to_json(OLD)::text);
--   PERFORM pg_notify('watchers',
--     json_build_object(
--       'meta', json_build_object('table', TG_TABLE_NAME, 'type', TG_OP),
--       'row', row_to_json(OLD)
--     )::text
--   );
--   RETURN NULL;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER foo_delete_trigger AFTER DELETE ON foo
-- FOR EACH ROW EXECUTE PROCEDURE notify_delete_trigger();

INSERT INTO foo (name) VALUES ('jesus420');
INSERT INTO foo (name) VALUES ('devil666');
INSERT INTO foo (name) VALUES ('robocop');
INSERT INTO foo (name) VALUES ('saturn5');
