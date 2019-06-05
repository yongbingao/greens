# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_06_04_122916) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "companies", force: :cascade do |t|
    t.string "ticker", null: false
    t.string "name", null: false
    t.string "ceo", null: false
    t.float "market_cap", null: false
    t.integer "employees"
    t.float "dividend"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "about", null: false
    t.integer "founded", null: false
    t.string "headquarter", null: false
    t.float "pe_ratio"
    t.integer "avg_volume", null: false
    t.index ["name"], name: "index_companies_on_name"
    t.index ["ticker"], name: "index_companies_on_ticker"
  end

  create_table "transactions", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "company_id", null: false
    t.float "purchase_price", null: false
    t.integer "purchase_shares", null: false
    t.float "average_price", null: false
    t.integer "net_shares", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_transactions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "current_buying_power", null: false
    t.index ["email"], name: "index_users_on_email"
    t.index ["username"], name: "index_users_on_username"
  end

end
