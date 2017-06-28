class StaticPagesController < ApplicationController

  def root
  end

  def search
    @gem = Gems.info(params[:query])
    if request.xhr?
      render :partial => './response'
    end
  end

  def favorites
  end

end
