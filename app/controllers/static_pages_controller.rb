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
  end

end
