require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should get index" do
    get users_url
    assert_response :success
  end


  test "should create user" do
    assert_difference("User.count") do
      post users_url, params: { user: { email: @user.email, matricula: @user.matricula, nome: @user.nome, senha: @user.senha, token: @user.token } }
    end

    assert_response :success
  end

  test "should show user" do
    get user_url(@user)
    assert_response :success
  end

  test "should get edit" do
    get edit_user_url(@user)
    assert_response :success
  end

  test "should update user" do
    patch user_url(@user), params: { user: { email: @user.email, matricula: @user.matricula, nome: @user.nome, senha: @user.senha, token: @user.token } }
    assert_redirected_to user_url(@user)
  end

end
