1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const app = express();

const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
};
app.use(express.static('./dist/book-management'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,'/dist/{{your-app-name}}/index.html'));
});

app.use(forceSSL());

app.listen(process.env.PORT || 8080);
