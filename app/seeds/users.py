from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

# Adds demo users with detailed information
def seed_users():
    demo_client = User(
        username='demo-client',
        email='demo-client@aa.io',
        password='password',
        firstname='Demo',
        lastname='Client',
        phone_num='123-456-7890',
        address='123 Demo St',
        city='Demoville',
        state='CA',
        zip='12345',
        is_manager=False
    )
    demo_manager = User(
        username='demo-manager',
        email='demo-manager@aa.io',
        password='password',
        firstname='Demo',
        lastname='Manager',
        phone_num='987-654-3210',
        address='456 Manager St',
        city='Managerville',
        state='NY',
        zip='54321',
        is_manager=True
    )
    manager = User(
        username='manager',
        email='manager@aa.io',
        password='password',
        firstname='Manager',
        lastname='User',
        phone_num='555-555-5555',
        address='789 Manager Ave',
        city='Manager City',
        state='TX',
        zip='67890',
        is_manager=True
    )
    user1 = User(
        username='user1',
        email='user1@aa.io',
        password='password',
        firstname='User',
        lastname='One',
        phone_num='111-111-1111',
        address='111 User St',
        city='Userville',
        state='FL',
        zip='11111',
        is_manager=False
    )
    user2 = User(
        username='user2',
        email='user2@aa.io',
        password='password',
        firstname='User',
        lastname='Two',
        phone_num='222-222-2222',
        address='222 User St',
        city='Userville',
        state='FL',
        zip='22222',
        is_manager=False
    )
    user3 = User(
        username='user3',
        email='user3@aa.io',
        password='password',
        firstname='User',
        lastname='Three',
        phone_num='333-333-3333',
        address='333 User St',
        city='Userville',
        state='FL',
        zip='33333',
        is_manager=False
    )
    user4 = User(
        username='user4',
        email='user4@aa.io',
        password='password',
        firstname='User',
        lastname='Four',
        phone_num='444-444-4444',
        address='444 User St',
        city='Userville',
        state='FL',
        zip='44444',
        is_manager=False
    )
    user5 = User(
        username='user5',
        email='user5@aa.io',
        password='password',
        firstname='User',
        lastname='Five',
        phone_num='555-555-5555',
        address='555 User St',
        city='Userville',
        state='FL',
        zip='55555',
        is_manager=False
    )
    user6 = User(
        username='user6',
        email='user6@aa.io',
        password='password',
        firstname='User',
        lastname='Six',
        phone_num='666-666-6666',
        address='666 User St',
        city='Userville',
        state='FL',
        zip='66666',
        is_manager=False
    )

    users = [demo_client, demo_manager, manager, user1, user2, user3, user4, user5, user6]

    for user in users:
        db.session.add(user)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't have a built-in method to do this.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()