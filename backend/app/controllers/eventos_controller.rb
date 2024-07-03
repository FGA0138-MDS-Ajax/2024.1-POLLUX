class EventosController < ApplicationController
  before_action :set_evento, only: %i[ show edit update destroy ]

  # GET /eventos or /eventos.json
  def index
    @eventos = Evento.all
    render json: @eventos
  end

  # GET /eventos/1 or /eventos/1.json
  def show
  end

  # GET /eventos/new
  def new
    @evento = Evento.new
  end

  # GET /eventos/1/edit
  def edit
  end

  # POST /eventos or /eventos.json
  def create
    @evento = Evento.new(evento_params)

    respond_to do |format|
      if @evento.save
        render json: @evento
      else
        render json: @evento.errors
      end
    end
  end

  # PATCH/PUT /eventos/1 or /eventos/1.json
  def update
    respond_to do |format|
      if @evento.update(evento_params)
        render json: @evento
      else
        render json: @evento.errors
      end
    end
  end

  # DELETE /eventos/1 or /eventos/1.json
  def destroy
    @evento.destroy!

    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_evento
      @evento = Evento.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def evento_params
      params.require(:evento).permit(:nome, :data, :HoraInicio, :HoraTermino, :user_id)
    end
end