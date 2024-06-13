require 'bcrypt'
# require 'jwt'
class UsersController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_user, only: %i[show edit update destroy]

  # GET /users or /users.json
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/1 or /users/1.json
  def show; end

  def login
    if User.find_by(matricula: user_params[:matricula])
      user = User.find_by(matricula: user_params[:matricula])
      pass = BCrypt::Password.new(user.senha)
    else
      render json: 'MATRICULA INEXISTENTE'
      return
    end
    if pass == user_params[:senha]
      hmac_secret = 'Secreto'
      payload = user_params[:matricula]
      token = JWT.encode payload, hmac_secret, 'HS256'
      render json: token
    else
      render json: 'SENHA INCORRETA'
    end
  end

  # GET /users/new
  def new
    # @user = User.new
  end

  # GET /users/1/edit
  def edit; end

  # POST /users or /users.json
  def create
    senha = user_params[:senha]
    hash = BCrypt::Password.create(senha)
    nome = user_params[:nome]
    matricula = user_params[:matricula]
    email = user_params[:email]
    cargoID = user_params[:cargo_id]
    @user = User.new(nome:, matricula:, email:, senha: hash, cargo_id: cargoID)

    if @user.save
      render json: @user
    else
      render json: @user.errors
    end

    # respond_to do |format|
    #  if @user.save
    #    format.html { redirect_to user_url(@user), notice: "User was successfully created." }
    #    format.json { render :show, status: :created, location: @user }
    #  else
    #    format.html { render :new, status: :unprocessable_entity }
    #    format.json { render json: @user.errors, status: :unprocessable_entity }
    #  end
    # end
  end

  # PATCH/PUT /users/1 or /users/1.json
  def update
    set_user
    if @user.update(update_params)
      render json: @user, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH /users/password/:id
  def update_password
    set_user
    senha = password_params[:senha]
    pp senha
    hash = BCrypt::Password.create(senha)
    @user.senha = hash

    if @user.save
      render json: @user
    else
      render json: @user.errors
    end
  end

  # DELETE /users/1 or /users/1.json
  def destroy
    @user.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def user_params
    params.require(:user).permit(:nome, :matricula, :email, :senha, :cargo_id, :token)
  end

  def update_params
    params.require(:user).permit(:nome, :matricula, :email, :cargo_id)
  end

  def password_params
    params.require(:user).permit(:senha)
  end

  def refresh_token
    params.require(:user).permit(:token)
  end
end
