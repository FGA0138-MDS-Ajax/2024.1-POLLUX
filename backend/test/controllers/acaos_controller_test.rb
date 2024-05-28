require "test_helper"

class AcaosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @acao = acaos(:one)
  end

  test "should get index" do
    get acaos_url
    assert_response :success
  end

  test "should get new" do
    get new_acao_url
    assert_response :success
  end

  test "should create acao" do
    assert_difference("Acao.count") do
      post acaos_url, params: { acao: {  } }
    end

    assert_redirected_to acao_url(Acao.last)
  end

  test "should show acao" do
    get acao_url(@acao)
    assert_response :success
  end

  test "should get edit" do
    get edit_acao_url(@acao)
    assert_response :success
  end

  test "should update acao" do
    patch acao_url(@acao), params: { acao: {  } }
    assert_redirected_to acao_url(@acao)
  end

  test "should destroy acao" do
    assert_difference("Acao.count", -1) do
      delete acao_url(@acao)
    end

    assert_redirected_to acaos_url
  end
end
