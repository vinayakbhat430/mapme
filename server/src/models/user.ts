import mongoose from "mongoose";
import { Password } from "../libs/password";

export interface UserAttrs {
  email: string;
  password: string;
  name:string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  name:string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
},{
    toJSON:{
        transform(doc,ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

userSchema.pre('save', async function(done) {
    if (this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done()
})

userSchema.statics.build = (attr: UserAttrs) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
