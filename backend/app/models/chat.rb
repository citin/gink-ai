class Chat < ApplicationRecord
  acts_as_chat

  belongs_to :owner, class_name: 'User', optional: true

  has_many :participants, dependent: :destroy
  has_many :users, through: :participants

  has_many :favorites, dependent: :destroy
  has_many :favorited_by, through: :favorites, source: :user
end
