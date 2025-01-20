from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import db, Message, Service
from ..forms import MessageForm

message_routes = Blueprint('messages', __name__)

@message_routes.route('/', methods=['POST'])
@login_required
def send_message():
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # Ensure only one of user_id or guide_id is provided
        if bool(form.user_id.data) == bool(form.guide_id.data):
            return jsonify({"message": "Provide either user_id or guide_id, not both."}), 400

        new_message = Message(
            user_id=form.user_id.data or current_user.id,
            guide_id=form.guide_id.data or current_user.id,
            service_id=form.service_id.data,
            message=form.message.data
        )

        db.session.add(new_message)
        db.session.commit()
        return jsonify(new_message.to_dict()), 201

    return jsonify({"message": "Validation error", "errors": form.errors}), 400


@message_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_message(id):
    message = Message.query.get(id)
    if not message:
        return jsonify({"message": "Message not found"}), 404

    # Check user permission
    if current_user.id not in {message.user_id, message.guide_id}:
        return jsonify({"message": "Forbidden"}), 403

    db.session.delete(message)
    db.session.commit()
    return jsonify({"message": "Message successfully deleted"}), 200


@message_routes.route('/conversation/<int:user_id>/<int:guide_id>', methods=['GET'])
@login_required
def get_messages_in_conversation(user_id, guide_id):
    if current_user.id not in {user_id, guide_id}:
        return jsonify({"message": "Forbidden"}), 403

    messages = Message.query.filter(
        (Message.user_id == user_id) & (Message.guide_id == guide_id) |
        (Message.user_id == guide_id) & (Message.guide_id == user_id)
    ).order_by(Message.timestamp).all()

    return jsonify([message.to_dict() for message in messages]), 200


@message_routes.route('/user', methods=['GET'])
@login_required
def get_conversations_for_user():
    user_id = current_user.id
    conversations = db.session.query(
        Message.guide_id,
        Service.title.label('serviceName'),
        Service.images.label('serviceImage')
    ).join(Service, Message.service_id == Service.id).filter(Message.user_id == user_id).distinct().all()

    return jsonify([{
        'id': guide_id,
        'guide_id': guide_id,
        'serviceName': serviceName,
        'serviceImage': serviceImage
    } for guide_id, serviceName, serviceImage in conversations]), 200


@message_routes.route('/guide', methods=['GET'])
@login_required
def get_conversations_for_guide():
    guide_id = current_user.id
    conversations = db.session.query(
        Message.user_id,
        Service.title.label('serviceName'),
        Service.images.label('serviceImage')
    ).join(Service, Message.service_id == Service.id).filter(Message.guide_id == guide_id).distinct().all()

    return jsonify([{
        'id': user_id,
        'user_id': user_id,
        'serviceName': serviceName,
        'serviceImage': serviceImage
    } for user_id, serviceName, serviceImage in conversations]), 200
