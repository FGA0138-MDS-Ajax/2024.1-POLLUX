require "test_helper"

class ReuniaosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @reuniao = reuniaos(:one)
  end

  test "should get index" do
    get reuniaos_url
    assert_response :success
  end

  test "should get new" do
    get new_reuniao_url
    assert_response :success
  end

  test "should create reuniao" do
    assert_difference("Reuniao.count") do
      post reuniaos_url, params: { reuniao: {  } }
    end

    assert_redirected_to reuniao_url(Reuniao.last)
  end

  test "should show reuniao" do
    get reuniao_url(@reuniao)
    assert_response :success
  end

  test "should get edit" do
    get edit_reuniao_url(@reuniao)
    assert_response :success
  end

  test "should update reuniao" do
    patch reuniao_url(@reuniao), params: { reuniao: {  } }
    assert_redirected_to reuniao_url(@reuniao)
  end

  test "should destroy reuniao" do
    assert_difference("Reuniao.count", -1) do
      delete reuniao_url(@reuniao)
    end

    assert_redirected_to reuniaos_url
  end
end
