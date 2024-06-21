class PasswordMailer < ApplicationMailer
    default from: 'no-reply@example.com', charset: 'UTF-8'
  
    def password_reset
      @user = params[:user]
      @reset_url = params[:reset_url]
  
      mail(to: @user.email, subject: 'Redefinição de Senha')
    end
  end
  