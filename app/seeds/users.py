from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


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
        is_manager=False,
        is_guide=False
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
        is_manager=True,
        is_guide=False
    )
    demo_guide = User(
        username='demo-guide',
        email='demo-guide@aa.io',
        password='password',
        firstname='Demo',
        lastname='Guide',
        phone_num='555-555-5555',
        address='789 Demo St',
        city='Demoville',
        state='CA',
        zip='12345',
        is_manager=False,
        is_guide=True,
        businessname="Demo's Guide Service",
        insurance_provider_name='Demo Insurance',
        insurance_number='000000000'
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
        is_manager=True,
        is_guide=False
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
        is_manager=False,
        is_guide=False
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
        is_manager=False,
        is_guide=False
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
        is_manager=False,
        is_guide=False
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
        is_manager=False,
        is_guide=False
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
        is_manager=False,
        is_guide=False
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
        is_manager=False,
        is_guide=False
    )

 
    guide1 = User(
        username='JohnDoe',
        email='john.doe@gmail.com',
        password='password',
        firstname='John',
        lastname='Doe',
        phone_num='123-456-7890',
        address='123 Main St',
        city='Cheyenne',
        state='WY',
        zip='82001',
        is_manager=False,
        is_guide=True,
        businessname="John's Guide Service",
        insurance_provider_name='Insurance Co',
        insurance_number='123456789'
    )
    guide2 = User(
        username='JaneSmith',
        email='jane.smith@gmail.com',
        password='password',
        firstname='Jane',
        lastname='Smith',
        phone_num='987-654-3210',
        address='456 Another St',
        city='Santa Fe',
        state='NM',
        zip='87501',
        is_manager=False,
        is_guide=True,
        businessname="Jane's Guide Service",
        insurance_provider_name='Insurance Co',
        insurance_number='987654321'
    )
    guide3 = User(
        username='MikeJohnson',
        email='mike.johnson@gmail.com',
        password='password',
        firstname='Mike',
        lastname='Johnson',
        phone_num='555-555-5555',
        address='789 Ocean Dr',
        city='Key West',
        state='FL',
        zip='33040',
        is_manager=False,
        is_guide=True,
        businessname="Mike's Fishing Adventures",
        insurance_provider_name='Insurance Co',
        insurance_number='555555555'
    )
    guide4 = User(
        username='SarahWilliams',
        email='sarah.williams@gmail.com',
        password='password',
        firstname='Sarah',
        lastname='Williams',
        phone_num='444-444-4444',
        address='101 Mountain Rd',
        city='Anchorage',
        state='AK',
        zip='99501',
        is_manager=False,
        is_guide=True,
        businessname="Sarah's Wilderness Expeditions",
        insurance_provider_name='Insurance Co',
        insurance_number='444444444'
    )
    guide5 = User(
        username='TomBrown',
        email='tom.brown@gmail.com',
        password='password',
        firstname='Tom',
        lastname='Brown',
        phone_num='333-333-3333',
        address='202 River St',
        city='Juneau',
        state='AK',
        zip='99801',
        is_manager=False,
        is_guide=True,
        businessname="Tom's Fishing Charters",
        insurance_provider_name='Insurance Co',
        insurance_number='333333333'
    )
    guide6 = User(
        username='EmilyDavis',
        email='emily.davis@gmail.com',
        password='password',
        firstname='Emily',
        lastname='Davis',
        phone_num='222-222-2222',
        address='303 Rock Climb Ln',
        city='Los Angeles',
        state='CA',
        zip='90001',
        is_manager=False,
        is_guide=True,
        businessname="Emily's Climbing Adventures",
        insurance_provider_name='Insurance Co',
        insurance_number='222222222'
    )
    guide7 = User(
        username='DavidMiller',
        email='david.miller@gmail.com',
        password='password',
        firstname='David',
        lastname='Miller',
        phone_num='111-111-1111',
        address='404 Canyon Rd',
        city='Springdale',
        state='UT',
        zip='84767',
        is_manager=False,
        is_guide=True,
        businessname="David's Climbing Expeditions",
        insurance_provider_name='Insurance Co',
        insurance_number='111111111'
    )
    guide8 = User(
        username='LauraWilson',
        email='laura.wilson@gmail.com',
        password='password',
        firstname='Laura',
        lastname='Wilson',
        phone_num='666-666-6666',
        address='505 Glacier Ave',
        city='Kalispell',
        state='MT',
        zip='59901',
        is_manager=False,
        is_guide=True,
        businessname="Laura's Backpacking Tours",
        insurance_provider_name='Insurance Co',
        insurance_number='666666666'
    )
    guide9 = User(
        username='ChrisMoore',
        email='chris.moore@gmail.com',
        password='password',
        firstname='Chris',
        lastname='Moore',
        phone_num='777-777-7777',
        address='606 Rapids Rd',
        city='Denver',
        state='CO',
        zip='80201',
        is_manager=False,
        is_guide=True,
        businessname="Chris's Rafting Adventures",
        insurance_provider_name='Insurance Co',
        insurance_number='777777777'
    )
    guide10 = User(
        username='AnnaTaylor',
        email='anna.taylor@gmail.com',
        password='password',
        firstname='Anna',
        lastname='Taylor',
        phone_num='888-888-8888',
        address='707 Kayak St',
        city='Boise',
        state='ID',
        zip='83701',
        is_manager=False,
        is_guide=True,
        businessname="Anna's Kayaking Tours",
        insurance_provider_name='Insurance Co',
        insurance_number='888888888'
    )
    guide11 = User(
        username='JamesAnderson',
        email='james.anderson@gmail.com',
        password='password',
        firstname='James',
        lastname='Anderson',
        phone_num='999-999-9999',
        address='808 Spear St',
        city='Cabo San Lucas',
        state='BCS',
        zip='23450',
        is_manager=False,
        is_guide=True,
        businessname="James's Spear Fishing",
        insurance_provider_name='Insurance Co',
        insurance_number='999999999'
    )
    guide12 = User(
        username='OliviaMartinez',
        email='olivia.martinez@gmail.com',
        password='password',
        firstname='Olivia',
        lastname='Martinez',
        phone_num='101-101-1010',
        address='909 Fly Fish Ln',
        city='Queenstown',
        state='OTG',
        zip='9300',
        is_manager=False,
        is_guide=True,
        businessname="Olivia's Fly Fishing",
        insurance_provider_name='Insurance Co',
        insurance_number='101010101'
    )
    guide13 = User(
        username='EthanThomas',
        email='ethan.thomas@gmail.com',
        password='password',
        firstname='Ethan',
        lastname='Thomas',
        phone_num='202-202-2020',
        address='1010 River Rd',
        city='Bozeman',
        state='MT',
        zip='59715',
        is_manager=False,
        is_guide=True,
        businessname="Ethan's Fly Fishing",
        insurance_provider_name='Insurance Co',
        insurance_number='202020202'
    )
    guide14 = User(
        username='SophiaWhite',
        email='sophia.white@gmail.com',
        password='password',
        firstname='Sophia',
        lastname='White',
        phone_num='303-303-3030',
        address='1111 Ski Ln',
        city='Whitefish',
        state='MT',
        zip='59937',
        is_manager=False,
        is_guide=True,
        businessname="Sophia's Ski Adventures",
        insurance_provider_name='Insurance Co',
        insurance_number='303030303'
    )
    guide15 = User(
        username='TenzingNorgay',
        email='tenzing.norgay@everestguides.com',
        password='everest2023',
        firstname='Tenzing',
        lastname='Norgay',
        phone_num='977-1-5555555',
        address='123 Everest Base Camp',
        city='Kathmandu',
        state='Bagmati',
        zip='44600',
        is_manager=False,
        is_guide=True,
        businessname="Everest Guided Trips",
        insurance_provider_name='Himalayan Insurance',
        insurance_number='EVEREST123'
    )

    users = [demo_client, demo_manager, demo_guide, manager, user1, user2, user3, user4, user5, user6, guide1, guide2, guide3, guide4, guide5, guide6, guide7, guide8, guide9, guide10, guide11, guide12, guide13, guide14, guide15]

    for user in users:
        db.session.add(user)

    db.session.commit()


def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()