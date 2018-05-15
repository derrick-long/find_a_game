module.exports = {
  ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash('error_msg', 'Please Sign In');
    res.redirect('/');
  },
  ensureGuest(req, res, next){
    if(req.isAuthenticated()){
      res.redirect('/dashboard');
    } else {
      return next();
    }
  },
};
