import mongoose from "mongoose";
import Product from "./Products";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Menambahkan virtual field untuk relasi one-to-many
UserSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "userId",
});

// Pre hook: saat user dihapus, semua produk miliknya juga dihapus
UserSchema.pre("findOneAndDelete", async function (next) {
  try {
    const user = await this.model.findOne(this.getFilter());
    await Product.deleteMany({ userId: user._id });
    next();
  } catch (err: unknown) {
    next(err as mongoose.CallbackError);
  }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
