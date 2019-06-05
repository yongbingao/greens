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

            # sql = SELECT *
            # @transactions = ActiveRecord::Base.connection.exec_query(sql)
            # debugger

            @transactions = ActiveRecord::Base.connection.exec_query(<<-SQL)
                SELECT *
                FROM (
                    SELECT *, ROW_NUMBER() OVER (PARTITION BY company_id ORDER BY created_at DESC) AS rn
                    FROM transactions
                    WHERE user_id = 1
                    ) AS rn
                WHERE rn = 1;
            SQL

            # debugger

            # @transactions = Transaction.where("user_id = ?", current_user.id).order(id: :ASC)
            # @company_list = @transactions.pluck(:company_id).uniq

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