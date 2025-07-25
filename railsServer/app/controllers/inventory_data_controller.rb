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

        page = params[:page] || 1
        per_page = params[:per_page] || 10

        if role == 'admin' || role == 'auditor'
            items = Inventory
        elsif role == 'technician' || role == 'manager'
            department = params[:department]
            items = Inventory.where(Department: department)
        elsif role == 'employee'
            items = Inventory.where(Assigned_User: username)
        else
            render json: { error: 'Unauthorized role' }, status: :unauthorized and return
        end

        paginated = items.page(page).per(per_page)

        render json: {
            items: paginated,
            current_page: paginated.current_page,
            total_pages: paginated.total_pages,
            total_count: paginated.total_count
        }, status: :ok
    end

    # Creates an entry in the inventory table based on the
    # json given to it.
    # manually sets the last update time to the time of processing.
    # returns the item if created successfully
    # returns an error message if the item could not be created
    def create
        item = Inventory.new(inventory_params)
        item.Last_Update = Time.now.strftime("%Y-%m-%d %H:%M:%S")
        item.Created_Date = Time.now.strftime("%Y-%m-%d %H:%M:%S")
        begin
            if item.save
                render json: item, status: :created
            else
                render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
            end
        rescue ActiveRecord::RecordNotUnique => e
            render json: { errors: ["ID already exists ."] }, status: :unprocessable_entity
        rescue => e
            render json: { errors: [e.message] }, status: :internal_server_error
        end

    end

    # Updates an entry based on the given id
    # The id is passed as a param in the url
    # manually sets the last update time to the time of processing.
    # returns the item if successful
    # returns an error if the item is not found
    # returns an error if the item could not be updated
    def update
        id = params[:Id]
        item = Inventory.find_by(Id: id)
      
        if item.nil?
            render json: { error: "Item not found" }, status: :not_found
        elsif item.update(inventory_params)
            item.Last_Update = Time.now.strftime("%Y-%m-%d %H:%M:%S")
            item.save
            render json: item, status: :ok
        else
            render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
        end
    end

    # Destroys an entry in the database according to the provided ID
    # returns a success message if successful
    # returns an "not found" error if unsuccessful
    def destroy
        id = params[:Id]
        item = Inventory.find_by(Id: id)
      
        if item
          item.destroy
          render json: { message: "Item deleted successfully" }, status: :ok
        else
          render json: { error: "Item not found" }, status: :not_found
        end
    end

    private

    # Verifies if an authToken exists in the database
    # The username and authToken are passed as paramaters in the url
    def verify_auth_token
        username = params[:username]
        token = params[:auth_token]
        records = AuthToken.all
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
          :Assigned_User,
          :Department
        )
      end

end