class ChatSerializer < ActiveModel::Serializer
  attributes :id, :title, :created_at, :updated_at, :is_favorite, :messages

  has_many :messages

  def is_favorite # rubocop:disable Naming/PredicateName
    scope&.favorited?(object) || false
  end

  def title
    "Chat #{object.id}"
  end
end
