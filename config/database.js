if(process.env.NODE_ENV === 'production'){
  module.exports = require('./keys_prod');
}else{
  module.exports = {mongoURI: "mongodb://localhost/find-game-dev"};
}
