from alembic import op

def create_schema():
    op.execute("CREATE SCHEMA IF NOT EXISTS guide_finder_schema")

if __name__ == "__main__":
    create_schema()