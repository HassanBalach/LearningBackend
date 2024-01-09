import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema({
    
    videoFile: {
        type: String,
        required: true,
    },
    thumbnail:  {
        type: String,
        required: true,
    }, // Assuming thumbnail is a URL or a path to the video's thumbnail image
    videoOwner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
  
},{timestamps: true});

videoSchema.plugin(mongooseAggregatePaginate)


export const Video = mongoose.model('Video', videoSchema);