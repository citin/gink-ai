module Pagination
  extend ActiveSupport::Concern
  include Pagy::Backend

  def paginate(collection)
    @pagy, paginated = pagy(collection, items: params[:per_page] || 25)
    paginated
  end

  def pagination_meta
    {
      current_page: @pagy.page,
      next_page: @pagy.next,
      prev_page: @pagy.prev,
      total_pages: @pagy.pages,
      total_count: @pagy.count
    }
  end
end 
