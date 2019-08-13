const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'build');
console.log(publicPath);
app.use(express.static(publicPath));

app.get('/*', function (req, res) {
  res.sendFile(path.join(publicPath, 'index.html'))
});

app.listen(3200, () => {
   console.log('Server is up')
});