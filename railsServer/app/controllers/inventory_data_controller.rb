class InventoryDataController < ApplicationController
    before_action :verify_auth_token
    
    # Looks up all of the inventory data depending on the user's role.
    # Roles are:
    #   Admin - Sees all assets and edits everything
    #   Auditor - Sees all assets but cannot edit any
    #   IT Technician - Sees all assets in their department and can edit them
    #   Manager - Sees all assets in their department but cannot edit
    #   Employee - Sees assets assigned to them but cannot edit
    def index
        username = params[:username]
        role = params[:user_role]
        if role == 'admin' || role == 'auditor'
            items = Inventory.all
        elsif role == 'technician' || role == 'manager'
            department = params[:department]
            items = Inventory.where(Department: department)
        elsif role == 'employee'
            items = Inventory.where(Assigned_User: username)
        else
            render json: { error: 'Unauthorized role' }, status: :unauthorized and return
        end
        render json: items, status: :ok
    end

    # Creates an entry in the inventory table based on the
    # json given to it.
    # returns the item if created successfully
    # returns an error message if the item could not be created
    def create
        item = Inventory.new(inventory_params)

        if item.save
          render json: item, status: :created
        else
          render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
        end
    end

    # Updates an entry based on the given id
    # The id is passed as a param in the url
    # returns the item if successful
    # returns an error if the item is not found
    # returns an error if the item could not be updated
    def update
        id = params[:Id]
        item = Inventory.find_by(Id: id)
      
        if item.nil?
            render json: { error: "Item not found" }, status: :not_found
        elsif item.update(inventory_params)
            item.save
            render json: item, status: :ok
        else
            render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
        end
      end

    private

    # Verifies if an authToken exists in the database
    # The username and authToken are passed as paramaters in the url
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

    # Specifies the parameters of the inventory table
    # Used for parsing json for the create method and
    # adding it to the table.
    def inventory_params
        params.require(:inventory).permit(
          :Id,
          :Name,
          :Type,
          :Status,
          :Created_Date,
          :Assigned_User,
          :Department,
          :Last_Update
        )
      end

end