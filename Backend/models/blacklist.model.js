const mongoose = require("mongoose");

const blacklistSchema =new mongoose.Schema({
    token : {type: String, require: true}
})

const BlacklistModel = mongoose.model("blackllist",blacklistSchema)

module.exports = {
    BlacklistModel
}