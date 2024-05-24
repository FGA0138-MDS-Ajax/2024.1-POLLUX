require "test_helper"

class TarefasControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tarefa = tarefas(:one)
  end

  test "should get index" do
    get tarefas_url
    assert_response :success
  end

  test "should get new" do
    get new_tarefa_url
    assert_response :success
  end

  test "should create tarefa" do
    assert_difference("Tarefa.count") do
      post tarefas_url, params: { tarefa: {  } }
    end

    assert_redirected_to tarefa_url(Tarefa.last)
  end

  test "should show tarefa" do
    get tarefa_url(@tarefa)
    assert_response :success
  end

  test "should get edit" do
    get edit_tarefa_url(@tarefa)
    assert_response :success
  end

  test "should update tarefa" do
    patch tarefa_url(@tarefa), params: { tarefa: {  } }
    assert_redirected_to tarefa_url(@tarefa)
  end

  test "should destroy tarefa" do
    assert_difference("Tarefa.count", -1) do
      delete tarefa_url(@tarefa)
    end

    assert_redirected_to tarefas_url
  end
end
