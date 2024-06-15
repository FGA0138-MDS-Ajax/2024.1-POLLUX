class StoragesController < ApplicationController
  before_action :set_storage, only: %i[show edit update destroy]

  # GET /storages or /storages.json
  def index
    @storages = Storage.all
    render json: @storages
  end

  # GET /storages/1 or /storages/1.json
  def show; end

  # GET /storages/new
  def new
    @storage = Storage.new
  end

  # GET /storages/1/edit
  def edit; end

  # POST /storages or /storages.json
  def create
    @storage = Storage.new(storage_params)

    respond_to do |format|
      if @storage.save
        format.html { redirect_to storage_url(@storage), notice: 'Storage was successfully created.' }
        format.json { render :show, status: :created, location: @storage }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @storage.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /storages/1 or /storages/1.json
  def update
    respond_to do |format|
      if @storage.update(storage_params)
        format.html { redirect_to storage_url(@storage), notice: 'Storage was successfully updated.' }
        format.json { render :show, status: :ok, location: @storage }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @storage.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /storages/1 or /storages/1.json
  def destroy
    @storage.destroy!

    respond_to do |format|
      format.html { redirect_to storages_url, notice: 'Storage was successfully destroyed.' }
      format.json { head :no_content }
    end
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
