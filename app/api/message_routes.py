from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import db, Message
from ..forms import MessageForm

message_routes = Blueprint('messages', __name__)

@message_routes.route('/', methods=['POST'])
@login_required
def send_message():
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # Ensure that either guide_id or user_id is provided, not both
        if form.user_id.data and form.guide_id.data:
            return jsonify({"message": "Invalid recipient. Messages must be sent between a user and a guide."}), 400
        
        # If the message is being sent to a guide
        if form.guide_id.data:
            new_message = Message(
                user_id=current_user.id,  # Automatically set the current logged-in user's ID
                guide_id=form.guide_id.data,  # Set the guide ID from the form (populated from the service page)
                message=form.message.data
            )
        else:
            return jsonify({"message": "Guide_id must be provided."}), 400

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

    if message.user_id != current_user.id and message.guide_id != current_user.id:
        return jsonify({"message": "Forbidden"}), 403

    db.session.delete(message)
    db.session.commit()
    return jsonify({"message": "Message successfully deleted"}), 200


@message_routes.route('/conversation/<int:user_id>/<int:guide_id>', methods=['GET'])
@login_required
def get_messages_in_conversation(user_id, guide_id):
    if current_user.id != user_id and current_user.id != guide_id:
        return jsonify({"message": "Forbidden"}), 403

    messages = Message.query.filter_by(user_id=user_id, guide_id=guide_id).all()
    return jsonify([message.to_dict() for message in messages]), 200


@message_routes.route('/user/<int:user_id>', methods=['GET'])
@login_required
def get_conversations_for_user(user_id):
    if current_user.id != user_id:
        return jsonify({"message": "Forbidden"}), 403

    conversations = Message.query.filter_by(user_id=user_id).all()
    return jsonify([conversation.to_dict() for conversation in conversations]), 200


@message_routes.route('/guide/<int:guide_id>', methods=['GET'])
@login_required
def get_conversations_for_guide(guide_id):
    if current_user.id != guide_id:
        return jsonify({"message": "Forbidden"}), 403

    conversations = Message.query.filter_by(guide_id=guide_id).all()
    return jsonify([conversation.to_dict() for conversation in conversations]), 200
