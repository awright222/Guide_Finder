from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import db, Review
from ..forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/', methods=['POST'])
@login_required
def create_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review(
            service_id=form.service_id.data,
            user_id=form.user_id.data,
            review=form.review.data,
            rating=form.rating.data
        )
        db.session.add(new_review)
        db.session.commit()
        return jsonify(new_review.to_dict()), 201

    return jsonify({"message": "Validation error", "errors": form.errors}), 400

@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review.query.get(id)
        if not review:
            return jsonify({"message": "Review not found"}), 404

        if review.user_id != current_user.id:
            return jsonify({"message": "Forbidden"}), 403

        review.service_id = form.service_id.data
        review.user_id = form.user_id.data
        review.review = form.review.data
        review.rating = form.rating.data
        db.session.commit()
        return jsonify(review.to_dict()), 200

    return jsonify({"message": "Validation error", "errors": form.errors}), 400

@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    if not review:
        return jsonify({"message": "Review not found"}), 404

    if review.user_id != current_user.id:
        return jsonify({"message": "Forbidden"}), 403

    db.session.delete(review)
    db.session.commit()
    return jsonify({"message": "Review successfully deleted"}), 200

@review_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_review(id):
    review = Review.query.get(id)
    if not review:
        return jsonify({"message": "Review not found"}), 404

    return jsonify(review.to_dict()), 200

@review_routes.route('/service/<int:service_id>', methods=['GET'])
@login_required
def get_reviews_by_service(service_id):
    sort_by = request.args.get('sort_by', 'newest')
    if sort_by == 'highest_rating':
        reviews = Review.query.filter_by(service_id=service_id).order_by(Review.rating.desc()).all()
    elif sort_by == 'lowest_rating':
        reviews = Review.query.filter_by(service_id=service_id).order_by(Review.rating.asc()).all()
    elif sort_by == 'oldest':
        reviews = Review.query.filter_by(service_id=service_id).order_by(Review.created_at.asc()).all()
    else:  # newest
        reviews = Review.query.filter_by(service_id=service_id).order_by(Review.created_at.desc()).all()

    return jsonify([review.to_dict() for review in reviews]), 200