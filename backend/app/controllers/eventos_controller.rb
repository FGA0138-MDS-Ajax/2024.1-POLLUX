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
        format.html { redirect_to evento_url(@evento), notice: "Evento was successfully created." }
        format.json { render :show, status: :created, location: @evento }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @evento.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /eventos/1 or /eventos/1.json
  def update
    respond_to do |format|
      if @evento.update(evento_params)
        format.html { redirect_to evento_url(@evento), notice: "Evento was successfully updated." }
        format.json { render :show, status: :ok, location: @evento }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @evento.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /eventos/1 or /eventos/1.json
  def destroy
    @evento.destroy!

    respond_to do |format|
      format.html { redirect_to eventos_url, notice: "Evento was successfully destroyed." }
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