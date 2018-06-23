const mongoose = require('mongoose')
 
const Schema = mongoose.Schema
 
const PostSchema = new Schema({
    title: { type: String, 
             required: [true, 'title is needed for every post'], 
             minlength: [6, 'title needs minimum 6 chars'],
             maxlength: [256, 'sorry, title cannot be 256'],
             postType: Number,
             index: { unique: true },

             validate: [{
                validator: function(v) {
                  return  !v.includes("bad");
                },
                message: 'your title {VALUE} should not have bad words!'
              } 
            ],
            },
    description: { type: String, required: true },
     
},  { collection: 'posts' });

// Duplicate the ID field.
PostSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
PostSchema.set('toJSON', {
    virtuals: true
});

PostSchema.pre('save', function(next) {
    console.log("Post Save called")
    var post = this;
    next()
});

PostSchema.methods.comparePassword = function(plainPassword, cb) {
    console.log("Plain ", plainPassword, "Pass ", this.password)
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Post', PostSchema);