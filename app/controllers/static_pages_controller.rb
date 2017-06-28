class StaticPagesController < ApplicationController

  def root
  end

  def search
    if request.xhr?
      render :partial => './response', locals: {response: params[:query]}
    end
  end

  def favorites
  end

end
