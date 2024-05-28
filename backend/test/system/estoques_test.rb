require "application_system_test_case"

class EstoquesTest < ApplicationSystemTestCase
  setup do
    @estoque = estoques(:one)
  end

  test "visiting the index" do
    visit estoques_url
    assert_selector "h1", text: "Estoques"
  end

  test "should create estoque" do
    visit estoques_url
    click_on "New estoque"

    click_on "Create Estoque"

    assert_text "Estoque was successfully created"
    click_on "Back"
  end

  test "should update Estoque" do
    visit estoque_url(@estoque)
    click_on "Edit this estoque", match: :first

    click_on "Update Estoque"

    assert_text "Estoque was successfully updated"
    click_on "Back"
  end

  test "should destroy Estoque" do
    visit estoque_url(@estoque)
    click_on "Destroy this estoque", match: :first

    assert_text "Estoque was successfully destroyed"
  end
end
