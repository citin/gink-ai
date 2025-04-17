class AddOwnerToChats < ActiveRecord::Migration[8.0]
  def change
    add_reference :chats, :owner, foreign_key: { to_table: :users }, null: true
  end
end
