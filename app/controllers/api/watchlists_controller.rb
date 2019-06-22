class Api::WatchlistsController < ApplicationController
    def create
        @watchlist = Watchlist.new(watchlist_params)
        @watchlist.user_id = current_user.id
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

    def show
        @watchlist = Watchlist.where("user_id = ? AND company_id = ?", current_user.id, params[:id].to_i).first

        if @watchlist 
            render :show
        else
            render json: {}
        end
    end

    def destroy
        watchlist = Watchlist.find_by(id: params[:id])
        watchlist.destroy
        render json: watchlist
    end

    private
    def watchlist_params
        params.require(:watchlist).permit(:company_id)
    end
end