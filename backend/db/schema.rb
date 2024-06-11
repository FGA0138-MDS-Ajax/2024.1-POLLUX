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

ActiveRecord::Schema[7.1].define(version: 2024_06_11_054248) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "acaos", force: :cascade do |t|
    t.string "titulo"
    t.float "valor"
    t.boolean "type"
    t.string "data"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_acaos_on_user_id"
  end

  create_table "cargos", force: :cascade do |t|
    t.string "nome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "documentos", force: :cascade do |t|
    t.string "titulo"
    t.integer "nivelAcesso"
    t.string "data"
    t.string "tipoDocumento"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_documentos_on_user_id"
  end

  create_table "reuniaos", force: :cascade do |t|
    t.string "titulo"
    t.string "ata"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_reuniaos_on_user_id"
  end

  create_table "storages", force: :cascade do |t|
    t.string "nome"
    t.string "quantidade"
    t.string "status"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_storages_on_user_id"
  end

  create_table "tarefas", force: :cascade do |t|
    t.string "titulo"
    t.string "descricao"
    t.string "data"
    t.integer "prioridade"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_tarefas_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "nome"
    t.string "matricula"
    t.string "email"
    t.string "senha"
    t.bigint "cargo_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cargo_id"], name: "index_users_on_cargo_id"
  end

  add_foreign_key "acaos", "users"
  add_foreign_key "documentos", "users"
  add_foreign_key "reuniaos", "users"
  add_foreign_key "storages", "users"
  add_foreign_key "tarefas", "users"
  add_foreign_key "users", "cargos"
end
