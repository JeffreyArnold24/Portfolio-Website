class Inventory < ApplicationRecord
    self.table_name = "inventory" # optional if Rails can infer it from model name
    validates :Id, presence: true
  end