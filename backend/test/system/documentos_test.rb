require "application_system_test_case"

class DocumentosTest < ApplicationSystemTestCase
  setup do
    @documento = documentos(:one)
  end

  test "visiting the index" do
    visit documentos_url
    assert_selector "h1", text: "Documentos"
  end

  test "should create documento" do
    visit documentos_url
    click_on "New documento"

    fill_in "Link", with: @documento.link
    fill_in "Nome", with: @documento.nome
    click_on "Create Documento"

    assert_text "Documento was successfully created"
    click_on "Back"
  end

  test "should update Documento" do
    visit documento_url(@documento)
    click_on "Edit this documento", match: :first

    fill_in "Link", with: @documento.link
    fill_in "Nome", with: @documento.nome
    click_on "Update Documento"

    assert_text "Documento was successfully updated"
    click_on "Back"
  end

  test "should destroy Documento" do
    visit documento_url(@documento)
    click_on "Destroy this documento", match: :first

    assert_text "Documento was successfully destroyed"
  end
end
