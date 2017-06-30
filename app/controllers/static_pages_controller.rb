class StaticPagesController < ApplicationController

  def root
  end

  def search
    @gem = Gems.info(params[:query])
  rescue JSON::ParserError
    if request.xhr?
      render :partial => './error', status: 404
    end
  else
    @dependencies = @gem['dependencies']['development'].map {|dep| Gems.info(dep['name'])}
    if request.xhr?
      render :partial => './response'
    end
  end

  def favorites
    if params[:favorites]
      favorite_list = JSON.parse(params[:favorites])
      @favorites = favorite_list.map { |favorite| Gems.info(favorite) }
    end
    if request.xhr?
      render :partial => './favorites'
    end
  end

end
