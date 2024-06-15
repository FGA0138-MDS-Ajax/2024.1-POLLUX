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

    fill_in "Ano", with: @acao.ano
    fill_in "Mes", with: @acao.mes
    check "Tipo" if @acao.tipo
    fill_in "Titulo", with: @acao.titulo
    fill_in "Valor", with: @acao.valor
    click_on "Create Acao"

    assert_text "Acao was successfully created"
    click_on "Back"
  end

  test "should update Acao" do
    visit acao_url(@acao)
    click_on "Edit this acao", match: :first

    fill_in "Ano", with: @acao.ano
    fill_in "Mes", with: @acao.mes
    check "Tipo" if @acao.tipo
    fill_in "Titulo", with: @acao.titulo
    fill_in "Valor", with: @acao.valor
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
