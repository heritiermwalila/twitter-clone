import User from "../core/schema/user.schema";

const Home = async (req, res, next) => {
  try {
    const user = await User.findById({  _id: req.session.user  });;
    console.log(user);
    res.status(200).render("home", { title: "Home" });
  } catch (error) {}
};

const Profile = (req, res, next) => {
  try {
    res.status(200).render('profile', {title: 'Profile'})
  } catch (error) {
    
  }
}


export {Profile, Home}