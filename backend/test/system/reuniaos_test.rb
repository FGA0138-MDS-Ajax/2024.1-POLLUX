require "application_system_test_case"

class ReuniaosTest < ApplicationSystemTestCase
  setup do
    @reuniao = reuniaos(:one)
  end

  test "visiting the index" do
    visit reuniaos_url
    assert_selector "h1", text: "Reuniaos"
  end

  test "should create reuniao" do
    visit reuniaos_url
    click_on "New reuniao"

    click_on "Create Reuniao"

    assert_text "Reuniao was successfully created"
    click_on "Back"
  end

  test "should update Reuniao" do
    visit reuniao_url(@reuniao)
    click_on "Edit this reuniao", match: :first

    click_on "Update Reuniao"

    assert_text "Reuniao was successfully updated"
    click_on "Back"
  end

  test "should destroy Reuniao" do
    visit reuniao_url(@reuniao)
    click_on "Destroy this reuniao", match: :first

    assert_text "Reuniao was successfully destroyed"
  end
end
