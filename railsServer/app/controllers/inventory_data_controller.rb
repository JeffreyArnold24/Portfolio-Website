class InventoryDataController < ApplicationController
    before_action :verify_auth_token
    
    def index
        items = Inventory.all
        render json: items, status: :ok  # This will render the Jbuilder view
    end

    private

    def verify_auth_token
        username = params[:username]
        token = params[:auth_token]
        record = AuthToken.find_by(username: username)
        if record.nil? || record.authToken != token
            render json: { error: 'Unauthorized' }, status: :unauthorized
            return
        end
        @current_user = record
    end

end