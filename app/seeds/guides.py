from app.models import db, Guide

def seed_guides():
    guides = [
        Guide(
            firstname='John',
            lastname='Doe',
            email='john.doe@gmail.com',
            phone_num='123-456-7890',
            address='123 Main St',
            city='Cheyenne',
            state='WY',
            zip='82001',
            businessname="John's Guide Service",
            insurance_provider_name='Insurance Co',
            insurance_number='123456789',
            services='Wyoming Mule Deer Hunt',
            username='JohnDoe',
            password='password'
        ),
        Guide(
            firstname='Jane',
            lastname='Smith',
            email='jane.smith@gmail.com',
            phone_num='987-654-3210',
            address='456 Another St',
            city='Santa Fe',
            state='NM',
            zip='87501',
            businessname="Jane's Guide Service",
            insurance_provider_name='Insurance Co',
            insurance_number='987654321',
            services='New Mexico Elk Hunt',
            username='JaneSmith',
            password='password'
        ),
        Guide(
            firstname='Mike',
            lastname='Johnson',
            email='mike.johnson@gmail.com',
            phone_num='555-555-5555',
            address='789 Ocean Dr',
            city='Key West',
            state='FL',
            zip='33040',
            businessname="Mike's Fishing Adventures",
            insurance_provider_name='Insurance Co',
            insurance_number='555555555',
            services='Florida Keys Fly Fishing',
            username='MikeJohnson',
            password='password'
        ),
        Guide(
            firstname='Sarah',
            lastname='Williams',
            email='sarah.williams@gmail.com',
            phone_num='444-444-4444',
            address='101 Mountain Rd',
            city='Anchorage',
            state='AK',
            zip='99501',
            businessname="Sarah's Wilderness Expeditions",
            insurance_provider_name='Insurance Co',
            insurance_number='444444444',
            services='Alaska Moose Hunt',
            username='SarahWilliams',
            password='password'
        ),
        Guide(
            firstname='Tom',
            lastname='Brown',
            email='tom.brown@gmail.com',
            phone_num='333-333-3333',
            address='202 River St',
            city='Juneau',
            state='AK',
            zip='99801',
            businessname="Tom's Fishing Charters",
            insurance_provider_name='Insurance Co',
            insurance_number='333333333',
            services='Alaska Fishing',
            username='TomBrown',
            password='password'
        ),
        Guide(
            firstname='Emily',
            lastname='Davis',
            email='emily.davis@gmail.com',
            phone_num='222-222-2222',
            address='303 Rock Climb Ln',
            city='Los Angeles',
            state='CA',
            zip='90001',
            businessname="Emily's Climbing Adventures",
            insurance_provider_name='Insurance Co',
            insurance_number='222222222',
            services='California Rock Climbing',
            username='EmilyDavis',
            password='password'
        ),
        Guide(
            firstname='David',
            lastname='Miller',
            email='david.miller@gmail.com',
            phone_num='111-111-1111',
            address='404 Canyon Rd',
            city='Springdale',
            state='UT',
            zip='84767',
            businessname="David's Climbing Expeditions",
            insurance_provider_name='Insurance Co',
            insurance_number='111111111',
            services='Zion National Park Rock Climbing',
            username='DavidMiller',
            password='password'
        ),
        Guide(
            firstname='Laura',
            lastname='Wilson',
            email='laura.wilson@gmail.com',
            phone_num='666-666-6666',
            address='505 Glacier Ave',
            city='Kalispell',
            state='MT',
            zip='59901',
            businessname="Laura's Backpacking Tours",
            insurance_provider_name='Insurance Co',
            insurance_number='666666666',
            services='Glacier National Park Montana Backpacking',
            username='LauraWilson',
            password='password'
        ),
        Guide(
            firstname='Chris',
            lastname='Moore',
            email='chris.moore@gmail.com',
            phone_num='777-777-7777',
            address='606 Rapids Rd',
            city='Denver',
            state='CO',
            zip='80201',
            businessname="Chris's Rafting Adventures",
            insurance_provider_name='Insurance Co',
            insurance_number='777777777',
            services='Colorado White Water Rafting',
            username='ChrisMoore',
            password='password'
        ),
        Guide(
            firstname='Anna',
            lastname='Taylor',
            email='anna.taylor@gmail.com',
            phone_num='888-888-8888',
            address='707 Kayak St',
            city='Boise',
            state='ID',
            zip='83701',
            businessname="Anna's Kayaking Tours",
            insurance_provider_name='Insurance Co',
            insurance_number='888888888',
            services='Idaho White Water Kayaking',
            username='AnnaTaylor',
            password='password'
        ),
        Guide(
            firstname='James',
            lastname='Anderson',
            email='james.anderson@gmail.com',
            phone_num='999-999-9999',
            address='808 Spear St',
            city='Cabo San Lucas',
            state='BCS',
            zip='23450',
            businessname="James's Spear Fishing",
            insurance_provider_name='Insurance Co',
            insurance_number='999999999',
            services='Baja Mexico Spear Fishing',
            username='JamesAnderson',
            password='password'
        ),
        Guide(
            firstname='Olivia',
            lastname='Martinez',
            email='olivia.martinez@gmail.com',
            phone_num='101-101-1010',
            address='909 Fly Fish Ln',
            city='Queenstown',
            state='OTG',
            zip='9300',
            businessname="Olivia's Fly Fishing",
            insurance_provider_name='Insurance Co',
            insurance_number='101010101',
            services='New Zealand Fly Fishing',
            username='OliviaMartinez',
            password='password'
        ),
        Guide(
            firstname='Ethan',
            lastname='Thomas',
            email='ethan.thomas@gmail.com',
            phone_num='202-202-2020',
            address='1010 River Rd',
            city='Bozeman',
            state='MT',
            zip='59715',
            businessname="Ethan's Fly Fishing",
            insurance_provider_name='Insurance Co',
            insurance_number='202020202',
            services='Montana Fly Fishing',
            username='EthanThomas',
            password='password'
        ),
        Guide(
            firstname='Sophia',
            lastname='White',
            email='sophia.white@gmail.com',
            phone_num='303-303-3030',
            address='1111 Ski Ln',
            city='Whitefish',
            state='MT',
            zip='59937',
            businessname="Sophia's Ski Adventures",
            insurance_provider_name='Insurance Co',
            insurance_number='303030303',
            services='Montana Backcountry Skiing',
            username='SophiaWhite',
            password='password'
        )
    ]

    for guide in guides:
        db.session.add(guide)

    db.session.commit()

def undo_guides():
    db.session.execute("DELETE FROM guides")
    db.session.commit()