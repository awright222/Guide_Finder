from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Guide, db
from app.forms import GuideForm

guide_routes = Blueprint('guides', __name__)

# Sign Up a Guide
@guide_routes.route('/signup', methods=['POST'])
def sign_up():
    form = GuideForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        guide = Guide(
            firstname=form.data['firstname'],
            lastname=form.data['lastname'],
            email=form.data['email'],
            phone_num=form.data['phone_num'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            zip=form.data['zip'],
            businessname=form.data['businessname'],
            insurance_provider_name=form.data['insurance_provider_name'],
            insurance_number=form.data['insurance_number'],
            services=form.data['services'],
            username=form.data['username'],
            password=form.data['password']
        )
        db.session.add(guide)
        db.session.commit()
        return jsonify(guide.to_dict()), 201
    return jsonify(form.errors), 400

# Update a Guide
@guide_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_guide(id):
    form = GuideForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    guide = Guide.query.get(id)
    if not guide:
        return jsonify({"message": "Guide not found"}), 404

    if form.validate_on_submit():
        guide.firstname = form.data['firstname']
        guide.lastname = form.data['lastname']
        guide.email = form.data['email']
        guide.phone_num = form.data['phone_num']
        guide.address = form.data['address']
        guide.city = form.data['city']
        guide.state = form.data['state']
        guide.zip = form.data['zip']
        guide.businessname = form.data['businessname']
        guide.insurance_provider_name = form.data['insurance_provider_name']
        guide.insurance_number = form.data['insurance_number']
        guide.services = form.data['services']
        guide.username = form.data['username']
        guide.password = form.data['password']

        db.session.commit()
        return jsonify(guide.to_dict()), 200
    return jsonify(form.errors), 400

# Delete a Guide
@guide_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_guide(id):
    guide = Guide.query.get(id)
    if not guide:
        return jsonify({"message": "Guide not found"}), 404

    db.session.delete(guide)
    db.session.commit()
    return jsonify({"message": "Guide successfully deleted"}), 200

# Get Guide Details
@guide_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_guide(id):
    guide = Guide.query.get(id)
    if not guide:
        return jsonify({"message": "Guide not found"}), 404
    return jsonify(guide.to_dict()), 200

# Get All Guides
@guide_routes.route('/', methods=['GET'])
@login_required
def get_guides():
    guides = Guide.query.all()
    return jsonify([guide.to_dict() for guide in guides]), 200