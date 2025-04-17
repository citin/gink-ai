class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable, :recoverable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :participants, dependent: :destroy
  has_many :chats, through: :participants

  has_many :owned_chats, class_name: 'Chat', foreign_key: 'owner_id', dependent: :destroy, inverse_of: false

  # Favorites, TODO: Favoritable

  has_many :favorites, dependent: :destroy
  has_many :favorite_chats, through: :favorites, source: :chat

  def favorite(chat)
    favorite_chats << chat unless favorited?(chat)
  end

  def unfavorite(chat)
    favorite_chats.delete(chat)
  end

  def favorited?(chat)
    favorite_chats.include?(chat)
  end
end
