class Api::CompaniesController < ApplicationController
    def index
        @companies = Company.all
        render :index
    end

    def show
        @company = Company.find_by(id: params[:id])
        render :show
    end

    def create
        @company = Company.create(company_params)
        if @company.save 
            render :show
        else
            render JSON: @company.errors.full_messages
        end
    end

    def update
        @company = Company.find_by(id: params[:id])
        if @company.update(company_params)
            render :show
        else
            render JSON: @company.errors.full_messages
        end
    end

    def destroy
        @company = Company.find_by(id: params[:id])
        if @company.destroy
            render JSON: ["Company deleted."]
        else
            render JSON: @company.errors.full_messages
        end
    end

    private
    def company_params
        params.require(:company).permit(:ticker, :name, :ceo, :market_cap, :employees, :dividend, :about, :founded, :headquarter, :pe_ratio, :avg_colume)
    end
end