import mongoose from "mongoose";


const profileSchema = new mongoose.Schema({
  userId: String,

  bio: String,
  github: String,
  linkedin: String,

  skills: [String],

  experience: [
    {
      company: String,
      role: String,
      duration: String,
    },
  ],

  projects: [
    {
      title: String,
      description: String,
      link: String,
    },
  ],

  certificates:[{url:String}],

  education: [
    {
      institute: String,
      degree: String,
      year: String,
    },
  ],
});

export default mongoose.model("Profile", profileSchema);