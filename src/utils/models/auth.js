import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: function () {
        return !this.isGoogleUser;
      }, 
    },
    isGoogleUser: { type: Boolean, default: false },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

userSchema.pre("validate", function () {
  if (this.isGoogleUser) {
    this.password = undefined;
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
