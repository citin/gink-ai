class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :sender

  def sender
    object.role
  end
end
