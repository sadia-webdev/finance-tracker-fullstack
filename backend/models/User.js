import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  profilePicture: String,
  createdAt: Date
});


// hash password
userSchema.pre("save", async function() {
    if(!this.isModified("password")) return


    const salt =  await bcrypt.genSalt(10)

    this.password = await bcrypt.hash(this.password, salt)

})


// compare password
userSchema.methods.comparePassword = function(inputPassword) {
    return bcrypt.compare(inputPassword, this.password)
}




export default  mongoose.model("User", userSchema)