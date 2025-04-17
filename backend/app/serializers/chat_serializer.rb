class ChatSerializer < ActiveModel::Serializer
  attributes :id, :title, :created_at, :updated_at, :is_favourite, :messages

  has_many :messages

  def is_favourite # rubocop:disable Naming/PredicateName
    scope&.favorited?(object) || false
  end

  def title
    "Chat #{object.id}"
  end
end
