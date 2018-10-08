module.exports = {
  ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash('error_msg', 'Please <a class=plain-link href='+'/auth/google/>' + 'Sign In </a>' );
    // add variable here that will get passed to view
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
