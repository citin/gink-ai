class ChatsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_chat, only: %i[show toggle_favourite ask]

  # GET /chats
  def index
    @pagy, chats = pagy(current_user.chats)
    render_json(chats, meta: { message: 'Chats retrieved successfully' }, each_serializer: ChatSerializer)
  end

  # GET /chats/:id
  def show
    render_json(@chat, meta: { message: 'Chat retrieved successfully' }, serializer: ChatSerializer)
  end

  # POST /chats
  def create
    chat = Chat.new(chat_params)
    chat.owner = current_user
    chat.users << current_user

    if chat.save
      render_json(chat, meta: { message: 'Chat created successfully' }, status: :created, serializer: ChatSerializer)
    else
      render_error(chat.errors.full_messages.to_sentence)
    end
  end

  # POST /chats/:id/ask
  def ask
    @chat.ask(params[:content])

    @response = @chat.messages.last

    render_json(@response, meta: { message: 'Message created successfully' }, status: :created,
                           serializer: MessageSerializer)
  rescue RubyLLM::BadRequestError => e
    # Workaround: delete messages from chat with empty content
    @chat.messages.where(role: 'assistant', content: '').destroy_all
    render_error(e.message, :unprocessable_entity)
  end

  # PATCH /chats/:id/toggle_favourite
  def toggle_favourite
    participant = @chat.participants.find_by(user: current_user)

    if participant
      participant.update(is_favourite: !participant.is_favourite)
      render_json(@chat, meta: { message: 'Favourite status toggled successfully' }, serializer: ChatSerializer)
    else
      render_error('You are not a participant in this chat', :forbidden)
    end
  end

  private

  def set_chat
    @chat = current_user.chats.find_by(id: params[:id])
    render_error('Chat not found', :not_found) unless @chat
  end

  def chat_params
    params.require(:chat).permit(:title)
  end
end
