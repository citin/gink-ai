class MessagesController < ApplicationController
  # before_action :authenticate_user!
  before_action :set_chat, only: %i[create]

  # POST /chats
  def create
    @response = @chat.ask(params[:content])
    @response.user = current_user

    if @response.save
      render_json(
        @response,
        meta: { message: 'Message created successfully' },
        status: :created,
        serializer: MessageSerializer
      )
    else
      render_error(@response.errors.full_messages.to_sentence)
    end
  end

  private

  def set_chat
    @chat = current_user.chats.find_by(id: params[:id])
    render_error('Chat not found', :not_found) unless @chat
  end

  def message_params
    params.require(:message).permit(:content, :chat_id)
  end
end
