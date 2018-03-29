const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req,res)=>{
  res.send('howdy');
});





app.listen(port, ()=>{
  console.log(`Server started on port ${port}`);
});
