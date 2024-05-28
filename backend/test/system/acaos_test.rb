require "application_system_test_case"

class AcaosTest < ApplicationSystemTestCase
  setup do
    @acao = acaos(:one)
  end

  test "visiting the index" do
    visit acaos_url
    assert_selector "h1", text: "Acaos"
  end

  test "should create acao" do
    visit acaos_url
    click_on "New acao"

    click_on "Create Acao"

    assert_text "Acao was successfully created"
    click_on "Back"
  end

  test "should update Acao" do
    visit acao_url(@acao)
    click_on "Edit this acao", match: :first

    click_on "Update Acao"

    assert_text "Acao was successfully updated"
    click_on "Back"
  end

  test "should destroy Acao" do
    visit acao_url(@acao)
    click_on "Destroy this acao", match: :first

    assert_text "Acao was successfully destroyed"
  end
end
