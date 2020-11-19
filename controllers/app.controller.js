import { ObjectId } from "mongodb";
import UserProfile from "../core/schema/profile.schema";
import User from "../core/schema/user.schema";

const Home = async (req, res, next) => {
  try {
    const profile = await (
      await UserProfile.findOne({ user: new ObjectId(req.session.user) })
    )
      .populate("user")
      .execPopulate();

    res.status(200).render("home", { title: "Home", profile });
  } catch (error) {
    console.log(error);
  }
};

const Profile = (req, res, next) => {
  try {
    res.status(200).render('profile', {title: 'Profile'})
  } catch (error) {
    
  }
}


export {Profile, Home}