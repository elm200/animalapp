class Cat < ActiveRecord::Base
  validates :name, presence: true
  validates :weight, numericality: :only_integer
end
