from app.models import db, Service

def seed_services():
    services = [
        # John Doe
        Service(
            guide_id=1,
            type="Hunting",
            location="Wyoming",
            country="USA",
            state="WY",
            description="Join us for a thrilling mule deer hunt in Wyoming.",
            cost=300.00,
            images="http://example.com/muledeerhunt.jpg",
            reviews="An unforgettable hunting experience!",
            experience_requirement="Intermediate",
            about_guide="John has been guiding hunts for over 20 years."
        ),
        Service(
            guide_id=1,
            type="Tracking",
            location="Wyoming",
            country="USA",
            state="WY",
            description="Track elk through the beautiful landscapes of Wyoming.",
            cost=350.00,
            images="http://example.com/elktracking.jpg",
            reviews="A challenging and rewarding expedition.",
            experience_requirement="Advanced",
            about_guide="John has been guiding hunts for over 20 years."
        ),

        # Jane Smith
        Service(
            guide_id=2,
            type="Hunting",
            location="New Mexico",
            country="USA",
            state="NM",
            description="Experience the thrill of elk hunting in New Mexico.",
            cost=400.00,
            images="http://example.com/elkhunt.jpg",
            reviews="An amazing hunting adventure!",
            experience_requirement="Intermediate",
            about_guide="Jane is an experienced hunter with over 15 years of experience."
        ),

        # Mike Johnson
        Service(
            guide_id=3,
            type="Fishing",
            location="Florida Keys",
            country="USA",
            state="FL",
            description="Fly fishing in the beautiful waters of the Florida Keys.",
            cost=250.00,
            images="http://example.com/flyfishing.jpg",
            reviews="A fantastic fishing trip!",
            experience_requirement="Beginner",
            about_guide="Mike is a professional fishing guide with over 10 years of experience."
        ),
        Service(
            guide_id=3,
            type="Fishing",
            location="Florida Keys",
            country="USA",
            state="FL",
            description="Join us for an exciting deep sea fishing tour.",
            cost=300.00,
            images="http://example.com/deepseafishing.jpg",
            reviews="An exhilarating fishing adventure!",
            experience_requirement="None",
            about_guide="Mike is a professional fishing guide with over 10 years of experience."
        ),

        # Sarah Williams
        Service(
            guide_id=4,
            type="Hunting",
            location="Alaska",
            country="USA",
            state="AK",
            description="Hunt moose in the wilds of Alaska.",
            cost=500.00,
            images="http://example.com/moosehunt.jpg",
            reviews="A once-in-a-lifetime hunting experience!",
            experience_requirement="Advanced",
            about_guide="Sarah is a seasoned hunter with over 12 years of experience."
        ),
        Service(
            guide_id=4,
            type="Tracking",
            location="Alaska",
            country="USA",
            state="AK",
            description="Track bears through the rugged terrain of Alaska.",
            cost=450.00,
            images="http://example.com/beartracking.jpg",
            reviews="A thrilling and educational tour.",
            experience_requirement="Intermediate",
            about_guide="Sarah is a seasoned hunter with over 12 years of experience."
        ),
        Service(
            guide_id=4,
            type="Training",
            location="Alaska",
            country="USA",
            state="AK",
            description="Learn essential backcountry survival skills.",
            cost=350.00,
            images="http://example.com/survivaltraining.jpg",
            reviews="An invaluable training experience.",
            experience_requirement="None",
            about_guide="Sarah is a seasoned hunter with over 12 years of experience."
        ),
        # Tom Brown
        Service(
            guide_id=5,
            type="Fishing",
            location="Alaska",
            country="USA",
            state="AK",
            description="Enjoy fishing in the pristine waters of Alaska.",
            cost=400.00,
            images="http://example.com/alaskafishing.jpg",
            reviews="An amazing fishing experience!",
            experience_requirement="Beginner",
            about_guide="Tom is an expert fisherman with over 15 years of experience."
        ),
        
        # Emily Davis
        Service(
            guide_id=6,
            type="Climbing",
            location="Yosemite National Park",
            country="USA",
            state="CA",
            description="Rock climbing adventures in California.",
            cost=300.00,
            images="http://example.com/rockclimbing.jpg",
            reviews="A thrilling climbing experience!",
            experience_requirement="Intermediate",
            about_guide="Emily is a professional climber with over 10 years of experience."
        ),
        Service(
            guide_id=6,
            type="Course",
            location="Yosemite National Park",
            country="USA",
            state="CA",
            description="Advanced traditional climbing course.",
            cost=500.00,
            images="http://example.com/tradclimbing.jpg",
            reviews="An excellent course for advanced climbers.",
            experience_requirement="Advanced",
            about_guide="Emily is a professional climber with over 10 years of experience."
        ),

        # David Miller
        Service(
            guide_id=7,
            type="Climbing",
            location="Zion National Park",
            country="USA",
            state="UT",
            description="Rock climbing in the stunning Zion National Park.",
            cost=350.00,
            images="http://example.com/zionclimbing.jpg",
            reviews="A breathtaking climbing experience!",
            experience_requirement="Intermediate",
            about_guide="David is an experienced climber with over 12 years of experience."
        ),
        
        # Laura Wilson
        Service(
            guide_id=8,
            type="Backpacking",
            location="Glacier National Park",
            country="USA",
            state="MT",
            description="Backpacking through the beautiful Glacier National Park.",
            cost=450.00,
            images="http://example.com/backpacking.jpg",
            reviews="An unforgettable backpacking adventure!",
            experience_requirement="Intermediate",
            about_guide="Laura is an experienced backpacker with over 8 years of experience."
        ),
        Service(
            guide_id=8,
            type="Training",
            location="Glacier National Park",
            country="USA",
            state="MT",
            description="Winter survival expedition in Glacier National Park.",
            cost=500.00,
            images="http://example.com/wintersurvival.jpg",
            reviews="A challenging and rewarding experience.",
            experience_requirement="Advanced",
            about_guide="Laura is an experienced backpacker with over 8 years of experience."
        ),
         # Chris Moore
        Service(
            guide_id=9,
            type="Rafting",
            location="Colorado River",
            country="USA",
            state="CO",
            description="Experience the thrill of Colorado white water rafting.",
            cost=150.00,
            images="http://example.com/rafting.jpg",
            reviews="Amazing experience!",
            experience_requirement="None",
            about_guide="Chris has been guiding rafting trips for over 10 years."
        ),
        
        # Anna Taylor
        Service(
            guide_id=10,
            type="Kayaking",
            location="Salmon River",
            country="USA",
            state="ID",
            description="Join us for an exciting white water kayaking adventure.",
            cost=120.00,
            images="http://example.com/kayaking.jpg",
            reviews="A thrilling adventure!",
            experience_requirement="Intermediate",
            about_guide="Anna is an expert kayaker with over 8 years of experience."
        ),

        # James Anderson
        Service(
            guide_id=11,
            type="Spear Fishing",
            location="Baja California",
            country="Mexico",
            state="BCS",
            description="Explore the underwater world with our spear fishing tours.",
            cost=200.00,
            images="http://example.com/spearfishing.jpg",
            reviews="An unforgettable experience!",
            experience_requirement="Advanced",
            about_guide="James is a professional spear fisherman with over 15 years of experience."
        ),
        # Olivia Martinez
        Service(
            guide_id=12,
            type="Fly Fishing",
            location="Lake Wakatipu",
            country="New Zealand",
            state="OTG",
            description="Enjoy fly fishing in the beautiful waters of New Zealand.",
            cost=180.00,
            images="http://example.com/flyfishing.jpg",
            reviews="A peaceful and rewarding experience.",
            experience_requirement="Beginner",
            about_guide="Olivia is a passionate fly fisher with over 5 years of experience."
        ),
        Service(
            guide_id=12,
            type="Workshop",
            location="Lake Wakatipu",
            country="New Zealand",
            state="OTG",
            description="Learn the art of saltwater fly casting in our workshop.",
            cost=100.00,
            images="http://example.com/workshop.jpg",
            reviews="Very informative and fun.",
            experience_requirement="None",
            about_guide="Olivia is a passionate fly fisher with over 5 years of experience."
        ),

        # Ethan Thomas
        Service(
            guide_id=13,
            type="Fly Fishing",
            location="Gallatin River",
            country="USA",
            state="MT",
            description="Fly fish in the pristine waters of Montana.",
            cost=160.00,
            images="http://example.com/montanaflyfishing.jpg",
            reviews="A fantastic fishing trip!",
            experience_requirement="Beginner",
            about_guide="Ethan is an experienced fly fishing guide with over 7 years of experience."
        ),

        # Sophia White
        Service(
            guide_id=14,
            type="Skiing",
            location="Whitefish Mountain",
            country="USA",
            state="MT",
            description="Backcountry skiing in the beautiful mountains of Montana.",
            cost=250.00,
            images="http://example.com/skiing.jpg",
            reviews="An exhilarating experience!",
            experience_requirement="Advanced",
            about_guide="Sophia is a professional skier with over 10 years of experience."
        ),
        Service(
            guide_id=14,
            type="Training",
            location="Whitefish Mountain",
            country="USA",
            state="MT",
            description="Learn avalanche safety in our comprehensive training program.",
            cost=200.00,
            images="http://example.com/avalanchetraining.jpg",
            reviews="Very educational and important.",
            experience_requirement="None",
            about_guide="Sophia is a professional skier with over 10 years of experience."
        ),
        # Tenzing Norgay
        Service(
            guide_id=15,
            type="Mountaineering",
            location="Mount Everest",
            country="Nepal",
            state="Bagmati",
            description="Guided trips up the world's highest peak.",
            cost=5000.00,
            images="http://example.com/everest.jpg",
            reviews="A once-in-a-lifetime experience!",
            experience_requirement="Expert",
            about_guide="Tenzing is a legendary mountaineer with numerous Everest summits."
        ),
        Service(
            guide_id=15,
            type="Training",
            location="Mount Everest",
            country="Nepal",
            state="Bagmati",
            description="High altitude training camp for aspiring climbers.",
            cost=3000.00,
            images="http://example.com/highaltitudetraining.jpg",
            reviews="Extremely helpful for high altitude acclimatization.",
            experience_requirement="Advanced",
            about_guide="Tenzing is a legendary mountaineer with numerous Everest summits."
        ),
        Service(
            guide_id=15,
            type="Preparation",
            location="Mount Everest",
            country="Nepal",
            state="Bagmati",
            description="Base camp preparation for your Everest expedition.",
            cost=2000.00,
            images="http://example.com/basecamppreparation.jpg",
            reviews="Essential for a successful climb.",
            experience_requirement="Intermediate",
            about_guide="Tenzing is a legendary mountaineer with numerous Everest summits."
        ),
        Service(
            guide_id=15,
            type="Cultural Tour",
            location="Mount Everest",
            country="Nepal",
            state="Bagmati",
            description="Sherpa-led cultural tours in the Everest region.",
            cost=1000.00,
            images="http://example.com/culturaltour.jpg",
            reviews="A fascinating cultural experience.",
            experience_requirement="None",
            about_guide="Tenzing is a legendary mountaineer with numerous Everest summits."
        ),
    ]

    for service in services:
        db.session.add(service)

    db.session.commit()

def undo_services():
    db.session.execute("DELETE FROM services")
    db.session.commit()