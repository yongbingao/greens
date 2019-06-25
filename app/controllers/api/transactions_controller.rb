class Api::TransactionsController < ApplicationController
    def create
        @transaction = Transaction.new(transaction_params)
        @transaction.user_id = current_user.id
        if @transaction.save
            render :show
        else
            render json: @transaction.errors.full_messages
        end
    end

    def index
        if current_user
            @recent_transactions = Transaction.find_by_sql ["
                SELECT *
                FROM (
                    SELECT *, ROW_NUMBER() OVER (PARTITION BY company_id ORDER BY created_at DESC) AS rn
                    FROM transactions
                    WHERE transactions.user_id = ? ) AS rn
                WHERE rn = 1;", current_user.id]
            # @transactions = Transaction.where("user_id = ?", current_user.id).order(id: :ASC)
            # @company_list = @transactions.pluck(:company_id).uniq
            @transactions = Transaction.where("user_id = ?", current_user.id).order(:id)

            render :index
        else
            render json: "Please log in to view your transactions."
        end
    end

    private
    def transaction_params
        params.require(:transaction)
            .permit(:company_id, :purchase_price, :purchase_shares, :average_price, :net_shares)
    end
end