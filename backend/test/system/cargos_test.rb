require "application_system_test_case"

class CargosTest < ApplicationSystemTestCase
  setup do
    @cargo = cargos(:one)
  end

  test "visiting the index" do
    visit cargos_url
    assert_selector "h1", text: "Cargos"
  end

  test "should create cargo" do
    visit cargos_url
    click_on "New cargo"

    fill_in "Nome", with: @cargo.nome
    click_on "Create Cargo"

    assert_text "Cargo was successfully created"
    click_on "Back"
  end

  test "should update Cargo" do
    visit cargo_url(@cargo)
    click_on "Edit this cargo", match: :first

    fill_in "Nome", with: @cargo.nome
    click_on "Update Cargo"

    assert_text "Cargo was successfully updated"
    click_on "Back"
  end

  test "should destroy Cargo" do
    visit cargo_url(@cargo)
    click_on "Destroy this cargo", match: :first

    assert_text "Cargo was successfully destroyed"
  end
end
