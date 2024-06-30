class AcaosController < ApplicationController
  before_action :set_acao, only: %i[show edit update destroy]

  # GET /acaos or /acaos.json
  def index
    @acaos = Acao.all
    render json: @acaos
  end

  # GET /acaos/1 or /acaos/1.json
  def show; end

  # GET /acaos/new
  def new
    @acao = Acao.new
  end

  # GET /acaos/1/edit
  def edit; end

  # POST /acaos or /acaos.json
  def create
    @acao = Acao.new(acao_params)

      if @acao.save
        render json: @acao
      else
        render json: "erro"
      end
  end

  # PATCH/PUT /acaos/1 or /acaos/1.json
  def update
    respond_to do |format|
      if @acao.update(acao_params)
        format.html { redirect_to acao_url(@acao), notice: 'Acao was successfully updated.' }
        format.json { render :show, status: :ok, location: @acao }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @acao.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /acaos/1 or /acaos/1.json
  def destroy
    @acao.destroy!
    render json: @acao
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_acao
    @acao = Acao.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def acao_params
    params.require(:acao).permit(:titulo, :valor, :tipo, :mes, :ano)
  end
end