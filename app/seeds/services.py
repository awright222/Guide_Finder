from app.models import db, Service, environment, SCHEMA
from sqlalchemy import text

def seed_services():
    services = [
        # John Doe (guide_id=10)
        Service(
            guide_id=10,
            title="Mule Deer Hunt in Wyoming",
            type="Hunting",
            location="Wyoming",
            country="USA",
            state="WY",
            description="Join us for a thrilling mule deer hunt in Wyoming.",
            cost=3000.00,
            images="https://sportsafield.com/wp-content/uploads/2020/09/NEW-LEAD_mule-deer-buck-QWERT-2017.jpg",
            reviews="An unforgettable hunting experience!",
            experience_requirement="Weekend Warrior",
            about_guide="John has been guiding hunts for over 20 years."
        ),
        Service(
            guide_id=10,
            title="Elk Hunting in Wyoming",
            type="Hunting",
            location="Wyoming",
            country="USA",
            state="WY",
            description="Track elk through the beautiful landscapes of Wyoming.",
            cost=4000.00,
            images="https://www.coloradoan.com/gcdn/presto/2022/03/23/PFTC/a27cc1cb-257e-4e7d-8624-7b8dbe52c65f-big_boy.jpg",
            reviews="A challenging and rewarding expedition.",
            experience_requirement="Pro",
            about_guide="John has been guiding hunts for over 20 years."
        ),
        
        # Jane Smith (guide_id=11)
        Service(
            guide_id=11,
            title="Climbing in Yosemite",
            type="Climbing",
            location="Yosemite",
            country="USA",
            state="CA",
            description="Experience the thrill of climbing in Yosemite National Park.",
            cost=4000.00,
            images="https://www.nps.gov/yose/planyourvisit/images/13072881_1006486406066308_4142589400643061469_o.jpg",
            reviews="An exhilarating climbing adventure!",
            experience_requirement="Pro",
            about_guide="Jane is a professional climber with over 15 years of experience."
        ),
        Service(
            guide_id=11,
            title="Backpacking on the Appalachian Trail",
            type="Backpacking",
            location="Appalachian Trail",
            country="USA",
            state="GA",
            description="Join us for a backpacking trip on the Appalachian Trail.",
            cost=2500.00,
            images="https://cdn.outsideonline.com/wp-content/uploads/2021/06/21/at-guide-lead_h.jpg",
            reviews="A memorable backpacking experience.",
            experience_requirement="Weekend Warrior",
            about_guide="Jane is an experienced backpacker and guide."
        ),

        # Mike Johnson (guide_id=12)
        Service(
            guide_id=12,
            title="Fly Fishing in the Florida Keys",
            type="Fishing",
            location="Florida Keys",
            country="USA",
            state="FL",
            description="Fly fishing in the beautiful waters of the Florida Keys.",
            cost=450.00,
            images="https://www.evergladesguideservices.com/wp-content/uploads/2020/02/3E9AC5F1-6D65-4F9F-B693-940F1F28CC7C.jpeg",
            reviews="A fantastic fishing trip!",
            experience_requirement="No Experience",
            about_guide="Mike is a professional fishing guide with over 10 years of experience."
        ),
        Service(
            guide_id=12,
            title="Deep Sea Fishing in the Florida Keys",
            type="Fishing",
            location="Florida Keys",
            country="USA",
            state="FL",
            description="Join us for an exciting deep sea fishing tour.",
            cost=500.00,
            images="https://www.boatsetter.com/boating-resources/wp-content/uploads/2022/12/deep-sea-fishing-in-florida-mahi-mahi.jpg",
            reviews="An exhilarating fishing adventure!",
            experience_requirement="No Experience",
            about_guide="Mike is a professional fishing guide with over 10 years of experience."
        ),

        # Sarah Williams (guide_id=13)
        Service(
            guide_id=13,
            title="Moose Hunt in Alaska",
            type="Hunting",
            location="Alaska",
            country="USA",
            state="AK",
            description="Hunt moose in the wilds of Alaska.",
            cost=5000.00,
            images="https://freerangeamerican.us/wp-content/uploads/2022/09/MooseLead2.jpg",
            reviews="A once-in-a-lifetime hunting experience!",
            experience_requirement="Pro",
            about_guide="Sarah is a seasoned hunter with over 12 years of experience."
        ),
        Service(
            guide_id=13,
            title="Bear Hunting in Alaska",
            type="Hunting",
            location="Alaska",
            country="USA",
            state="AK",
            description="Track bears through the rugged terrain of Alaska.",
            cost=3000.00,
            images="https://alaskaoutdoorssupersite.com/images/stories/activities/hunting/brown_bear/brown_bear_home.jpg",
            reviews="A thrilling and educational tour.",
            experience_requirement="Weekend Warrior",
            about_guide="Sarah is a seasoned hunter with over 12 years of experience."
        ),
        Service(
            guide_id=13,
            title="Backcountry Survival Training in Alaska",
            type="Backpacking",
            location="Alaska",
            country="USA",
            state="AK",
            description="Learn essential backcountry survival skills.",
            cost=450.00,
            images="https://alaskawild.org/wp-content/uploads/2017/06/Surviving-AK-blog-1.jpg",
            reviews="An invaluable training experience.",
            experience_requirement="No Experience",
            about_guide="Sarah is a seasoned hunter with over 12 years of experience."
        ),

        # Tom Brown (guide_id=14)
        Service(
            guide_id=14,
            title="Fishing in Alaska",
            type="Fishing",
            location="Alaska",
            country="USA",
            state="AK",
            description="Enjoy fishing in the pristine waters of Alaska.",
            cost=400.00,
            images="https://www.alaskaluxuryadventures.com/images/Destination_Alaska_2/1d99bef8-810f-46f0-b018-a1fd63056778.webp",
            reviews="An amazing fishing experience!",
            experience_requirement="No Experience",
            about_guide="Tom is an expert fisherman with over 15 years of experience."
        ),

        # Emily Davis (guide_id=15)
        Service(
            guide_id=15,
            title="Rock Climbing in Yosemite",
            type="Climbing",
            location="Yosemite National Park",
            country="USA",
            state="CA",
            description="Rock climbing adventures in California.",
            cost=300.00,
            images="https://www.travelyosemite.com/media/823902/yosemite-national-park-rock-climbing-anchoring-2.jpg?mode=pad&rnd=133074573020000000",
            reviews="A thrilling climbing experience!",
            experience_requirement="Weekend Warrior",
            about_guide="Emily is a professional climber with over 10 years of experience."
        ),
        Service(
            guide_id=15,
            title="Advanced Traditional Climbing Course",
            type="Climbing",
            location="Yosemite National Park",
            country="USA",
            state="CA",
            description="Advanced traditional climbing course.",
            cost=500.00,
            images="https://images.squarespace-cdn.com/content/v1/638927954320c12d8056bbbd/1691535504202-CPEWX4SK99GSRFCNQ9CD/Drew+Smith+Yosemite.jpg?format=2500w",
            reviews="An excellent course for advanced climbers.",
            experience_requirement="Pro",
            about_guide="Emily is a professional climber with over 10 years of experience."
        ),

        # David Miller (guide_id=16)
        Service(
            guide_id=16,
            title="Rock Climbing in Zion National Park",
            type="Climbing",
            location="Zion National Park",
            country="USA",
            state="UT",
            description="Rock climbing in the stunning Zion National Park.",
            cost=350.00,
            images="https://cdn.climbing.com/wp-content/uploads/2011/06/kate-rutherford-gets-a-pleasantly-tight.jpg",
            reviews="A breathtaking climbing experience!",
            experience_requirement="Weekend Warrior",
            about_guide="David is an experienced climber with over 12 years of experience."
        ),

        # Laura Wilson (guide_id=17)
        Service(
            guide_id=17,
            title="Backpacking in Glacier National Park",
            type="Backpacking",
            location="Glacier National Park",
            country="USA",
            state="MT",
            description="Backpacking through the beautiful Glacier National Park.",
            cost=450.00,
            images="https://www.nps.gov/common/uploads/grid_builder/glac/crop16_9/35C1C409-BA92-67D8-0D8F5AAE09D24DE9.jpg?width=640&quality=90&mode=crop",
            reviews="An unforgettable backpacking adventure!",
            experience_requirement="Weekend Warrior",
            about_guide="Laura is an experienced backpacker with over 8 years of experience."
        ),
        Service(
            guide_id=17,
            title="Winter Survival Expedition in Glacier National Park",
            type="Backpacking",
            location="Glacier National Park",
            country="USA",
            state="MT",
            description="Winter survival expedition in Glacier National Park.",
            cost=500.00,
            images="https://blog.glaciermt.com/wp-content/uploads/2022/12/Noah-Couser-GNP-Nordic-Ski-215-1024x683.jpg",
            reviews="A challenging and rewarding experience.",
            experience_requirement="Pro",
            about_guide="Laura is an experienced backpacker with over 8 years of experience."
        ),

        # Chris Moore (guide_id=18)
        Service(
            guide_id=18,
            title="White Water Rafting on the Colorado River",
            type="Water Sports",
            location="Colorado River",
            country="USA",
            state="CO",
            description="Experience the thrill of Colorado white water rafting.",
            cost=350.00,
            images="https://www.awanderlustadventure.com/wordpress/wp-content/uploads/2018/11/DSC7974.jpg",
            reviews="Amazing experience!",
            experience_requirement="No Experience",
            about_guide="Chris has been guiding rafting trips for over 10 years."
        ),
        
        # Anna Taylor (guide_id=19)
        Service(
            guide_id=19,
            title="White Water Kayaking on the Salmon River",
            type="Water Sports",
            location="Salmon River",
            country="USA",
            state="ID",
            description="Join us for an exciting white water kayaking adventure.",
            cost=620.00,
            images="https://img.freepik.com/premium-photo/aerial-view-extreme-sport-kayak-sails-mountain-river-rafting-whitewater-kayaking-generative-ai_87561-4212.jpg",
            reviews="A thrilling adventure!",
            experience_requirement="Weekend Warrior",
            about_guide="Anna is an expert kayaker with over 8 years of experience."
        ),

        # James Anderson (guide_id=20)
        Service(
            guide_id=20,
            title="Spear Fishing in Baja California",
            type="Fishing",
            location="Baja California",
            country="Mexico",
            state="BCS",
            description="Explore the underwater world with our spear fishing tours.",
            cost=1200.00,
            images="https://cdn.shopify.com/s/files/1/0402/0528/7574/files/Captured_by_dan_Silveira_with_Sola_Video_Pro_15_000_s_4.jpg?v=1683140104",
            reviews="An unforgettable experience!",
            experience_requirement="Pro",
            about_guide="James is a professional spear fisherman with over 15 years of experience."
        ),

        # Olivia Martinez (guide_id=21)
        Service(
            guide_id=21,
            title="Fly Fishing in Lake Wakatipu",
            type="Fishing",
            location="Lake Wakatipu",
            country="New Zealand",
            state="OTG",
            description="Enjoy fly fishing in the beautiful waters of New Zealand.",
            cost=1000.00,
            images="https://assets.isu.pub/document-structure/190318122216-3a1760dc2cff206345621f36da71a1ab/v1/34a0e532c1416f15e3164bfd427da804.jpg?width=720&quality=85%2C50",
            reviews="A peaceful and rewarding experience.",
            experience_requirement="No Experience",
            about_guide="Olivia is a passionate fly fisher with over 5 years of experience."
        ),
        Service(
            guide_id=21,
            title="Saltwater Fly Casting Workshop",
            type="Other",
            location="Lake Wakatipu",
            country="New Zealand",
            state="OTG",
            description="Learn the art of saltwater fly casting in our workshop.",
            cost=400.00,
            images="https://www.manictackleproject.com/cdn/shop/articles/kahawai-on-popper-fly_5d7312ca-fcd6-4380-a19e-1e7e3393fa7c.jpg?v=1637190151",
            reviews="Very informative and fun.",
            experience_requirement="No Experience",
            about_guide="Olivia is a passionate fly fisher with over 5 years of experience."
        ),

        # Ethan Thomas (guide_id=22)
        Service(
            guide_id=22,
            title="Fly Fishing in the Gallatin River",
            type="Fishing",
            location="Gallatin River",
            country="USA",
            state="MT",
            description="Fly fish in the pristine waters of Montana.",
            cost=400.00,
            images="https://www.montanaangler.com/sites/default/files/styles/full/public/uploads/2021-11/p1fl6tjf4lgvsfol14sj1inktjo6.jpg.jpg?itok=T45cTr04",
            reviews="A fantastic fishing trip!",
            experience_requirement="No Experience",
            about_guide="Ethan is an experienced fly fishing guide with over 7 years of experience."
        ),

        # Sophia White (guide_id=23)
        Service(
            guide_id=23,
            title="Backcountry Skiing in Whitefish Mountain",
            type="Snow Sports",
            location="Whitefish Mountain",
            country="USA",
            state="MT",
            description="Backcountry skiing in the beautiful mountains of Montana.",
            cost=250.00,
            images="https://lh4.googleusercontent.com/qhy0vJjz1LdnizaPUlXGFzSfoZhgc1wj710_M3q2BZwYjnNS3q5YESy7DT014ac7jnd8ZpmXAkn2TYfF_Jd3lRT_j-qrNl0xGwiZp_G0TXomOCcEqCe-XXBjItkVDxGU0e8yd8yw",
            reviews="An exhilarating experience!",
            experience_requirement="Pro",
            about_guide="Sophia is a professional skier with over 10 years of experience."
        ),
        Service(
            guide_id=23,
            title="Avalanche Safety Training",
            type="Training",
            location="Whitefish Mountain",
            country="USA",
            state="MT",
            description="Learn avalanche safety in our comprehensive training program.",
            cost=200.00,
            images="https://i0.wp.com/avtraining.org/wp-content/uploads/2020/12/8L8A0801.1-copy.jpg",
            reviews="Very educational and important.",
            experience_requirement="No Experience",
            about_guide="Sophia is a professional skier with over 10 years of experience."
        ),

        # Tenzing Norgay (guide_id=24)
        Service(
            guide_id=24,
            title="Mount Everest Expedition",
            type="Mountaineering",
            location="Mount Everest",
            country="Nepal",
            state="Bagmati",
            description="Guided trips up the world's highest peak.",
            cost=5000.00,
            images="https://57hours.com/wp-content/uploads/2021/03/Mount-Everest-climbing13-888x591.jpg",
            reviews="A once-in-a-lifetime experience!",
            experience_requirement="Pro",
            about_guide="Tenzing is a legendary mountaineer with numerous Everest summits."
        ),
        Service(
            guide_id=24,
            title="High Altitude Training Camp",
            type="Other",
            location="Mount Everest",
            country="Nepal",
            state="Bagmati",
            description="High altitude training camp for aspiring climbers.",
            cost=3000.00,
            images="https://www.summitclimb.com/uploads/slides/images/slide_1588831580_everest-trek-nepal.jpg",
            reviews="Extremely helpful for high altitude acclimatization.",
            experience_requirement="Pro",
            about_guide="Tenzing is a legendary mountaineer with numerous Everest summits."
        ),
        Service(
            guide_id=24,
            title="Base Camp Preparation",
            type="Other",
            location="Mount Everest",
            country="Nepal",
            state="Bagmati",
            description="Base camp preparation for your Everest expedition.",
            cost=3000.00,
            images="https://i.natgeofe.com/n/754066bf-ee3d-464f-99a5-6eda10b18c13/everest-basecamp-life-outside-dome_16x9.jpg",
            reviews="Essential for a successful climb.",
            experience_requirement="Weekend Warrior",
            about_guide="Tenzing is a legendary mountaineer with numerous Everest summits."
        ),
        Service(
            guide_id=24,
            title="Sherpa-led Cultural Tours",
            type="Other",
            location="Mount Everest",
            country="Nepal",
            state="Bagmati",
            description="Sherpa-led cultural tours in the Everest region.",
            cost=2000.00,
            images="https://www.nepalhightrek.com/wp-content/uploads/2023/10/Village-in-Everest.jpg",
            reviews="A fascinating cultural experience.",
            experience_requirement="No Experience",
            about_guide="Tenzing is a legendary mountaineer with numerous Everest summits."
        )
    ]

    for service in services:
        db.session.add(service)

    db.session.commit()

def undo_services():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.services RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM services"))

    db.session.commit()