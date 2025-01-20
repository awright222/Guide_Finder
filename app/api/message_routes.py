from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from flask_cors import cross_origin
from ..models import db, Message, Service, User
from ..forms import MessageForm

message_routes = Blueprint('messages', __name__)

@message_routes.route('/', methods=['POST'])
@login_required
@cross_origin(supports_credentials=True)
def send_message():
    form = MessageForm()
    form['csrf_token'].data = request.cookies.get('csrf_token')
    if form.validate_on_submit():
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


@message_routes.route('/conversation/<int:id>', methods=['DELETE'])
@login_required
@cross_origin(supports_credentials=True)
def delete_conversation(id):
    messages = Message.query.filter_by(service_id=id).all()
    if not messages:
        return jsonify({"message": "Conversation not found"}), 404

    if not any(current_user.id in {message.user_id, message.guide_id} for message in messages):
        return jsonify({"message": "Forbidden"}), 403

    for message in messages:
        db.session.delete(message)
    db.session.commit()
    return jsonify({"message": "Conversation successfully deleted"}), 200


@message_routes.route('/conversation/<int:user_id>/<int:guide_id>', methods=['GET'])
@login_required
@cross_origin(supports_credentials=True)
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
@cross_origin(supports_credentials=True)
def get_conversations_for_user():
    user_id = current_user.id
    conversations = db.session.query(
        Message.guide_id,
        Service.title.label('serviceName'),
        Service.images.label('serviceImage'),
        User.firstname.label('guideFirstName'),
        User.lastname.label('guideLastName')
    ).join(Service, Message.service_id == Service.id).join(User, Message.guide_id == User.id).filter(Message.user_id == user_id).distinct().all()

    return jsonify([{
        'id': guide_id,
        'guide_id': guide_id,
        'serviceName': serviceName,
        'serviceImage': serviceImage,
        'guideName': f"{guideFirstName} {guideLastName}"
    } for guide_id, serviceName, serviceImage, guideFirstName, guideLastName in conversations]), 200


@message_routes.route('/guide', methods=['GET'])
@login_required
@cross_origin(supports_credentials=True)
def get_conversations_for_guide():
    guide_id = current_user.id
    conversations = db.session.query(
        Message.user_id,
        Service.title.label('serviceName'),
        Service.images.label('serviceImage'),
        User.firstname.label('userFirstName'),
        User.lastname.label('userLastName')
    ).join(Service, Message.service_id == Service.id).join(User, Message.user_id == User.id).filter(Message.guide_id == guide_id).distinct().all()

    return jsonify([{
        'id': user_id,
        'user_id': user_id,
        'serviceName': serviceName,
        'serviceImage': serviceImage,
        'userName': f"{userFirstName} {userLastName}"
    } for user_id, serviceName, serviceImage, userFirstName, userLastName in conversations]), 200
