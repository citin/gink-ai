# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(current_user, _opts = {})
    token = request.env['warden-jwt_auth.token']
    headers['Authorization'] = token

    render json: {
      status: { code: 200, message: 'Logged in successfully.' },
      data: current_user.as_json(only: %i[id email created_at]),
      token: token
    }, status: :ok
  end

  def respond_to_on_destroy
    if authenticated_user
      render json: { status: 200, message: 'Logged out successfully.' }, status: :ok
    else
      render json: { status: 401, message: "Couldn't find an active session." }, status: :unauthorized
    end
  end

  def authenticated_user
    return nil if auth_headers.blank?

    User.find_by(id: decoded_jwt_token&.dig('sub'))
  rescue JWT::DecodeError
    nil
  end

  def decoded_jwt_token
    token = auth_headers[/Bearer (.+)/, 1]

    JWT.decode(token, Rails.application.credentials.devise_jwt_secret_key!).first
  end

  def auth_headers
    @auth_headers ||= request.headers['Authorization'].to_s
  end
end
