const mongoose = require('mongoose')
 
const Schema = mongoose.Schema
 
const ChannelSchema = new Schema({
    name: { type: String, 
             required: [true, 'name is needed for every post'], 
             minlength: [4, 'name needs minimum 4 chars'],
             maxlength: [100, 'sorry, title cannot be more than 100 chars'],
            
             index: { unique: true },

             validate: [{
                validator: function(v) {
                  return  !v.includes("bad");
                },
                message: 'your name {VALUE} should not have bad words!'
              } 
            ],
            },

    title: { type: String, 
        required: [true, 'title is needed for every post'], 
        minlength: [6, 'title needs minimum 6 chars'],
        maxlength: [256, 'sorry, title cannot be 256'],
       
        validate: [],
        },

    description: { type: String, 
            required: [true, 'description is needed for every post'], 
            minlength: [6, 'description needs minimum 6 chars'],
            maxlength: [256, 'sorry, description cannot be 256'],
            
            validate: [],
            },
    
    sidebar: { type: String, 
        required: [true, 'sidebar is needed for every post'], 
        minlength: [6, 'sidebar needs minimum 6 chars'],
        maxlength: [256, 'sorry, sidebar cannot be 256'],
        
        validate: [],
        },   

    submissionText: { type: String, 
        required: [true, 'submissionText is needed for every post'], 
        minlength: [6, 'submissionText needs minimum 6 chars'],
        maxlength: [256, 'sorry, submissionText cannot be 256'],
        
        validate: [],
        },   


    createdAt    : { type: Date }, 
    updatedAt    : { type: Date }
    
      
},  { collection: 'channels' });

// Duplicate the ID field.
ChannelSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ChannelSchema.set('toJSON', {
    virtuals: true
});

ChannelSchema.pre('save', function(next) {
    console.log("Channel Save called")
    var channel = this;

    const dateNow = new Date();
    this.updatedAt = dateNow;
    if ( !this.createdAt ) {
        this.createdAt = dateNow;
    }
    
    next()
});
 

ChannelSchema.methods.toJSON = function() {
    var obj = this.toObject();
   
    return obj;
}


module.exports = mongoose.model('Channel', ChannelSchema);