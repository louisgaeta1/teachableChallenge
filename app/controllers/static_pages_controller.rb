class StaticPagesController < ApplicationController

  def root
  end

  def search
    @gem = Gems.info(params[:query])
    @dependencies = @gem['dependencies']['development'].map {|dep| Gems.info(dep['name'])}
    # byebug
    if request.xhr?
      render :partial => './response'
    end
  end

  def favorites
  end

end
