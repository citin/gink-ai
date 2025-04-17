class Message < ApplicationRecord
  acts_as_message

  belongs_to :user, optional: true
end
