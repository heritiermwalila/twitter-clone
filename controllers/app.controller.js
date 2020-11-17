const Home = (req, res, next) => {
  try {
    res.status(200).render('home', {title: 'Home'})
  } catch (error) {
    
  }
}

const Profile = (req, res, next) => {
  try {
    res.status(200).render('profile', {title: 'Profile'})
  } catch (error) {
    
  }
}


export {Profile, Home}