class UsersController < ApplicationController
  before_action :authenticate_user!

  # GET /me
  def me
    render_json(current_user, meta: { message: 'Current user information' })
  end
end
