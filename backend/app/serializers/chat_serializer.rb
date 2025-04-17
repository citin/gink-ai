class ChatSerializer < ActiveModel::Serializer
  attributes :id, :title, :created_at, :updated_at, :is_favourite, :messages

  has_many :messages

  def is_favourite
    [true, false].sample
  end

  def title
    "Chat #{object.id}"
  end
end
