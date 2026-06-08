const { Schema, model, models } = require('mongoose')

const Wishlist = new Schema({
  id:            { type: String },
  media_type:    { type: String },
  poster_path:   { type: String },
  name:          { type: String },
  original_name: { type: String },
  title:         { type: String },
  vote_average:  { type: String },
  episode:       { type: String },
  season:        { type: String },
  url:           { type: String },
}, { timestamps: true })

const History = new Schema({
  id:            { type: String },
  media_type:    { type: String },
  poster_path:   { type: String },
  name:          { type: String },
  original_name: { type: String },
  title:         { type: String },
  vote_average:  { type: String },
  episode:       { type: String },
  season:        { type: String },
  url:           { type: String },
}, { timestamps: true })

const user = new Schema({
  user_name: { type: String },
  email:     { type: String },
  password:  { type: String },
  role:      { type: String },
  suspend:   { type: Boolean },
  ban:       { type: Boolean },
  history:   [History],
  wishlist:  [Wishlist],
}, { timestamps: true })

module.exports = models.user || model('user', user)