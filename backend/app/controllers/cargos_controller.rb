class CargosController < ApplicationController
  before_action :set_cargo, only: %i[ show edit update destroy ]

  # GET /cargos or /cargos.json
  def index
    @cargos = Cargo.all
  end

  # GET /cargos/1 or /cargos/1.json
  def show
  end

  # GET /cargos/new
  def new
    @cargo = Cargo.new
  end

  # GET /cargos/1/edit
  def edit
  end

  # POST /cargos or /cargos.json
  def create
    @cargo = Cargo.new(cargo_params)

    respond_to do |format|
      if @cargo.save
        format.html { redirect_to cargo_url(@cargo), notice: "Cargo was successfully created." }
        format.json { render :show, status: :created, location: @cargo }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @cargo.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /cargos/1 or /cargos/1.json
  def update
    respond_to do |format|
      if @cargo.update(cargo_params)
        format.html { redirect_to cargo_url(@cargo), notice: "Cargo was successfully updated." }
        format.json { render :show, status: :ok, location: @cargo }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @cargo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /cargos/1 or /cargos/1.json
  def destroy
    @cargo.destroy!

    respond_to do |format|
      format.html { redirect_to cargos_url, notice: "Cargo was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_cargo
      @cargo = Cargo.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def cargo_params
      params.require(:cargo).permit(:nome)
    end
end
