# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_06_30_021134) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "acaos", force: :cascade do |t|
    t.string "titulo"
    t.float "valor"
    t.boolean "tipo"
    t.string "mes"
    t.string "ano"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "acessos", force: :cascade do |t|
    t.boolean "acesso_documents"
    t.boolean "acesso_meetings"
    t.boolean "acesso_calendar"
    t.boolean "acesso_finance"
    t.boolean "acesso_admin"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_acessos_on_user_id"
  end

  create_table "documentos", force: :cascade do |t|
    t.string "nome"
    t.string "link"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "eventos", force: :cascade do |t|
    t.string "nome"
    t.string "data"
    t.string "HoraInicio"
    t.string "HoraTermino"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reuniaos", force: :cascade do |t|
    t.string "nome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reunioes_links", force: :cascade do |t|
    t.string "link"
    t.string "descricao"
    t.bigint "reuniao_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["reuniao_id"], name: "index_reunioes_links_on_reuniao_id"
  end

  create_table "reunioes_usuarios", force: :cascade do |t|
    t.bigint "reuniao_id", null: false
    t.bigint "user_id", null: false
    t.boolean "present"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["reuniao_id"], name: "index_reunioes_usuarios_on_reuniao_id"
    t.index ["user_id"], name: "index_reunioes_usuarios_on_user_id"
  end

  create_table "storages", force: :cascade do |t|
    t.string "nome"
    t.integer "quantidade"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "nome"
    t.string "matricula"
    t.string "email"
    t.string "senha"
    t.string "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "acessos", "users"
  add_foreign_key "reunioes_links", "reuniaos"
  add_foreign_key "reunioes_usuarios", "reuniaos"
  add_foreign_key "reunioes_usuarios", "users"
end
