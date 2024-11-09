// anyModel.ts
import mongoose from "mongoose";

interface AnyModelAttrs {
  userId: string;
  [key: string]: any;
}

interface AnyModelDoc extends mongoose.Document {
  userId: string;
  [key: string]: any;
}

interface AnyModelModel extends mongoose.Model<AnyModelDoc> {
  build(attrs: AnyModelAttrs): AnyModelDoc;
}

const anyModelSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    // Additional fields can be stored dynamically
  },
  {
    toJSON:{
        transform(doc,ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    strict:false
  }
);

anyModelSchema.statics.build = (attrs: AnyModelAttrs) => {
  return new AnyModel(attrs);
};

const AnyModel = mongoose.model<AnyModelDoc, AnyModelModel>("AnyModel", anyModelSchema);

export { AnyModel };
