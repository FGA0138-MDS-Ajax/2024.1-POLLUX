class StoragesController < ApplicationController
  before_action :set_storage, only: %i[show edit update destroy]

  # GET /storages or /storages.json
  def index
    @storages = Storage.all
    render json: @storages
  end

  # GET /storages/1 or /storages/1.json
  def show; end

  def getStorage
    estoque = Storage.find_by(id: storage_params[:id])
    render json: estoque
  end

  # GET /storages/new
  def new
    @storage = Storage.new
  end

  # GET /storages/1/edit
  def edit; end

  # POST /storages or /storages.json
  def create
    @storage = Storage.new(storage_params)

      if @storage.save
        render json: @storage
      else
        render json: @storage.errors
      end
  end

  # PATCH/PUT /storages/1 or /storages/1.json
  def update
      if @storage.update(storage_params)
       render json: @storage
      else
        render json: @storage.errors
      end
  end

  # DELETE /storages/1 or /storages/1.json
  def destroy
    @storage.destroy!
    render json: @storage
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_storage
    @storage = Storage.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def storage_params
    params.require(:storage).permit(:nome, :quantidade, :status, :user_id, :id)
  end
end
