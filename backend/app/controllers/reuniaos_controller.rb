class ReuniaosController < ApplicationController
  before_action :set_reuniao, only: %i[show edit update destroy new_link update_link delete_link]
  before_action :set_reunioes_link, only: %i[update_link delete_link]

  # GET /reuniaos or /reuniaos.json
  def index
    @reuniaos = Reuniao.includes(:reunioes_links).includes(:reunioes_usuarios).order(:id).all
    render json: @reuniaos.to_json(include: [:reunioes_links, :reunioes_usuarios])
  end

  # GET /reuniaos/1 or /reuniaos/1.json
  def show; end

  # GET /reuniaos/new
  def new
    @reuniao = Reuniao.new
  end

  # GET /reuniaos/1/edit
  def edit; end

  # POST /reuniaos or /reuniaos.json
  def create
    @reuniao = Reuniao.new(reuniao_params)
    if @reuniao.save
      populate_usuarios_for_reuniao(@reuniao)
      render json: @reuniao, status: :created
    else
      render json: @reuniao.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /reuniaos/1 or /reuniaos/1.json
  def update
    respond_to do |format|
      if @reuniao.update(reuniao_params)
        format.json { render :show, status: :ok, location: @reuniao }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @reuniao.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /reuniaos/1 or /reuniaos/1.json
  def destroy
    @reuniao.destroy
  end

  # POST /reuniaos/link
  def new_link
    set_reuniao
    if @reuniao
      @reunioes_link = @reuniao.reunioes_links.build(reuniao_links_params)
      
      if @reunioes_link.save
        render json: @reunioes_link, status: :created
      else
        render json: @reunioes_link.errors, status: :unprocessable_entity
      end
    else
      render json: { error: "Reuniao not found" }, status: :not_found
    end
  end

  # PUT /reuniaos/:id/update_link/:link_id
  def update_link
    puts "Params: #{params.inspect}" # Log params for debugging
  
    if @reuniao && @reunioes_link
      if @reunioes_link.update(reuniao_links_params)
        render json: @reunioes_link, status: :ok
      else
        render json: @reunioes_link.errors, status: :unprocessable_entity
      end
    else
      puts "Reuniao: #{@reuniao.inspect}"
      puts "ReunioesLink: #{@reunioes_link.inspect}"
  
      render json: { error: "ReunioesLink or Reuniao not found" }, status: :not_found
    end
  end

  # DELETE /reuniaos/:id/delete_link/:link_id
  def delete_link
    @reunioes_link.destroy
    head :no_content
  end

  def edit_presence
    puts "Reuniao ID: #{params[:id]}"
    @reuniao = Reuniao.find_by(id: params[:id])
    if @reuniao
      if params[:user].present? && params[:user].is_a?(Array)
        params[:user].each do |user_data|
          user_id = user_data[:user_id]
          present = user_data[:present]
          @reunioes_usuario = @reuniao.reunioes_usuarios.find_by(user_id: user_id)
          if @reunioes_usuario
            @reunioes_usuario.update(present: present)
          else
            render json: { error: "User with ID #{user_id} not found for Reuniao with ID #{params[:id]}" }, status: :not_found
            return
          end
        end
      else
        render json: { error: "Invalid 'user' parameter format or missing 'user' parameter" }, status: :unprocessable_entity
        return
      end
  
      render json: { message: "Presence edited successfully for all users" }, status: :ok
    else
      render json: { error: "Reuniao with ID #{params[:id]} not found" }, status: :not_found
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_reuniao
    @reuniao = Reuniao.find_by(id: params[:reuniao_id])
    unless @reuniao
      render json: { error: "Reuniao not found with ID #{params[:reuniao_id]}" }, status: :not_found
    end
  end

  def set_reunioes_link
    @reunioes_link = @reuniao.reunioes_links.find_by(id: params[:link_id])
  end

  def populate_usuarios_for_reuniao(reuniao)
    users = User.all
    reuniao.reunioes_usuarios.create(users.map { |user| { user_id: user.id } })
  end

  # Only allow a list of trusted parameters through.
  def reuniao_params
    params.require(:reuniao).permit(:nome, :user_id)
  end

  # Only allow a list of trusted parameters through.
  def reuniao_links_params
    params.require(:reunioes_link).permit(:reuniao_id, :link, :descricao)
  end

  # Only allow a list of trusted parameters through.
  def reuniao_usuarios_params
    params.require(:reunioes_usuarios).permit(:reuniao_id, :user_id, :present)
  end
end
