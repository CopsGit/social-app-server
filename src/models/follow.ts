import {mongoose, Schema, uniqueValidator} from "./index";

const FollowSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    following: [String],
    followers: [String],
    status: {
        isActive: {
            type: Boolean,
        },
        editAt: {
            type: Date,
        }
    },
})

FollowSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Follow', FollowSchema, 'follow')