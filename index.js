global.express = require('express');
global.app = express();
global.bodyParser = require('body-parser');
global.sorgu = require('./sorgu.js').sorgu;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

///////////////////////// GET - POST /////////////////////////
app.get('/api', async (req, res) => {
    let username = req.query.username;
    if (!username) return res.send({
        error: true,
        message: 'Lütfen bir kullanıcı adı giriniz.'
    });

    if (username.length < 3) return res.send({
        error: true,
        message: 'Lütfen geçerli bir kullanıcı adı giriniz.'
    });

    let check = await sorgu(username);
    if (!check.status) return res.send({
        error: true,
        message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.'
    });
    res.json(check);
});

app.use((req, res, next) => {
    res.status(404).send({
        error: true,
        message: '404: Sayfa bulunamadı.',
        github: 'github.com/fastuptime'
    });
});
///////////////////////// GET - POST /////////////////////////

app.listen(80, () => {
    console.log('Web site açıldı. Port: 80')
});