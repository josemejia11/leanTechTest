function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}
// leanTechTest
const express = require('express');
const app = express();

app.use(requireHTTPS);
app.use(express.static('./dist/leanTechTest'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/leanTechTest/'}),
);

// app.listen(process.env.PORT || 8080);
port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('Server is on port ', port);
});
