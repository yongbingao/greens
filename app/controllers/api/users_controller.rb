class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        @user.current_buying_power = 50000
        if @user.save
            login(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 401
        end
    end

    def update
        @user = current_user
        if @user.update(user_params)
            render :show
        else
            render json @user.errors.full_messages
        end
    end

    private
    def user_params
        params.require(:user).permit(:username, :email, :password, :current_buying_power)
    end
end