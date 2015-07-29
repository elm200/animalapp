json.array!(@cats) do |cat|
  json.extract! cat, :id, :name, :weight
  json.url cat_url(cat, format: :json)
end
