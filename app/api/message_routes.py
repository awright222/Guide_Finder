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
        if not form.user_id.data and not form.guide_id.data:
            return jsonify({"message": "Either user_id or guide_id must be provided."}), 400

        if form.user_id.data and form.guide_id.data:
            return jsonify({"message": "Only one of user_id or guide_id should be provided."}), 400

        if form.user_id.data:
            new_message = Message(
                user_id=form.user_id.data,
                guide_id=current_user.id,
                message=form.message.data
            )
        else:
            new_message = Message(
                user_id=current_user.id,
                guide_id=form.guide_id.data,
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
