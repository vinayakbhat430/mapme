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
  { strict: false } // Allows for saving flexible fields
);

anyModelSchema.statics.build = (attrs: AnyModelAttrs) => {
  return new AnyModel(attrs);
};

const AnyModel = mongoose.model<AnyModelDoc, AnyModelModel>("AnyModel", anyModelSchema);

export { AnyModel };
