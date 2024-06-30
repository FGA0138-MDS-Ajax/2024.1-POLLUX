require 'bcrypt'
require 'jwt'
class UsersController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_user, only: %i[show edit update destroy]

  # GET /users or /users.json
  def index
    @users = User.includes(:acesso).order(:id).all
    render json: @users.to_json(include: :acesso)
  end

  # GET /users/1 or /users/1.json
  def show
    render json: @user.to_json(include: :acesso)
  end

  def autenticar
    token = user_params[:token]
    hmac_secret = 'Secreto'
    decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
    a_Validar = decoded_token[0]
    if User.find_by(matricula: a_Validar)
      user = User.find_by(matricula: a_Validar)
      render json: user
    else
      render json: "-1"
    end
  end

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
    @user = User.new(nome:, matricula:, email:, senha: hash)
    @user.build_acesso(acesso_params)

    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
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
      if @user.acesso.present?
        @user.acesso.update(acesso_params)
      else
        @user.create_acesso(acesso_params)
      end
      render json: @user, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH /users/password/:id
  def update_password
    set_user
    senha = password_params[:senha]
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
    set_user
    @user.destroy

    @user.acesso.destroy if @user.acesso.present?
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def user_params
    params.require(:user).permit(:nome, :matricula, :email, :senha, :token)
  end

  def acesso_params
    params.require(:acesso).permit(:acesso_documents, :acesso_meetings, :acesso_calendar, :acesso_finance,:acesso_admin)
  end

  def update_params
    params.require(:user).permit(:nome, :matricula, :email)
  end

  def password_params
    params.require(:user).permit(:senha)
  end

  def refresh_token
    params.require(:user).permit(:token)
  end
end