class Api::WatchlistsController < ApplicationController
    def create
        @watchlist = Watchlist.new(watchlist_params)
        if @watchlist.save
            render :show
        else
            render json: @watchlist.errors.full_messages
        end
    end

    def index
        @watchlists = Watchlist.where("user_id = ?", current_user.id)
        render :index
    end

    def destroy
        watchlist = Watchlist.find_by(id: params[:id])
        watchlist.destroy
    end

    private
    def watchlist_params
        params.require(:watchlist).permit(:company_id, :user_id)
    end
end