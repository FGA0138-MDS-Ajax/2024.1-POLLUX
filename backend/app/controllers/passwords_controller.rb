# app/controllers/passwords_controller.rb
class PasswordsController < ApplicationController
    def forgot
      if params[:email].blank?
        return render json: { error: 'Email not present' }, status: :bad_request
      end
  
      user = User.find_by(email: params[:email])
  
      if user.present?
        @token = user.signed_id(purpose: 'password_reset', expires_in: 15.minutes)
        reset_url = "http://localhost:5173/NewPassword/#{@token}"
        PasswordMailer.with(user: user, reset_url: reset_url).password_reset.deliver_later
        render json: { status: 'ok', token: @token }, status: :ok
      else
        render json: { error: ['Email nao encontrado'] }, status: :not_found
      end
    end
  
    def reset
      @token = params[:token]
      @user = User.find_signed(@token, purpose: 'password_reset')
  
      if @user.present?
        senha = params[:password]
        hash = BCrypt::Password.create(senha)
        @user.senha = hash
  
        if @user.save
          render json: { status: 'ok' }, status: :ok
        else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: 'Token invalido ou expirado' }, status: :unprocessable_entity
      end
    end
  end
  
