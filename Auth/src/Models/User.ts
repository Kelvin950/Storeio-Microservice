import {Schema , model} from 'mongoose';
import {User} from "@models/models.interface";
import {genSalt, hash} from 'bcryptjs'
 
const userSchema = new Schema<User>({
    name:String,
    password:String
}, {
    timestamps:true ,  toJSON:{
        transform(doc, ret, options) {
            ret.id= ret._id;
            delete ret.password ;
            delete ret._id;
        },
    }
})

userSchema.pre('save', async function(next){
          
    const salt =  await genSalt(12);
      
    const hashPass =  await hash(this.password , salt);

  this.password =  hashPass ; 


    

})


export default model("User" , userSchema);