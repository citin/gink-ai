class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?
  include Pagination

  def render_json(resource, options = {})
    meta = options.fetch(:meta, {})
    meta.merge!(pagination_meta) if @pagy.present?
    render json: resource, meta: meta, status: options.fetch(:status, :ok)
  end

  def render_error(message, status = :unprocessable_entity)
    render json: { error: message }, status: status
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[name])
  end

  # Override authenticate_user! to explicitly handle JWT token authentication
  def authenticate_user!
    if request.headers['Authorization'].blank?
      render_error('Authorization token is missing', :unauthorized)
      return
    end

    super
  rescue JWT::DecodeError, JWT::ExpiredSignature
    render_error('Invalid or expired token', :unauthorized)
  end
end
