class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :chat

  # Ensure a user can only favorite a chat once
  validates :user_id, uniqueness: { scope: :chat_id }
end
