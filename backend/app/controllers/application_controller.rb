class ApplicationController < ActionController::API
  include Pagination
  
  def render_json(resource, options = {})
    meta = options.fetch(:meta, {})
    meta.merge!(pagination_meta) if @pagy.present?
    render json: resource, meta: meta, status: options.fetch(:status, :ok)
  end
  
  def render_error(message, status = :unprocessable_entity)
    render json: { error: message }, status: status
  end
end
