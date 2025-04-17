class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable, :recoverable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :participants, dependent: :destroy
  has_many :chats, through: :participants
  has_many :owned_chats, class_name: 'Chat', foreign_key: 'owner_id', dependent: :destroy, inverse_of: false
end
