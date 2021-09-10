const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/items');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

const port= process.env.PORT    || 3000;

mongodb = 'mongodb+srv://med:aitchikhait@cluster0.3bwgv.mongodb.net/items-database?retryWrites=true&w=majority';
app.use(express.urlencoded({ extended: true }));
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected')
    app.listen(port);

}).catch(err => console.log(err))

app.set('view engine', 'ejs');
// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());



    
app.get('/get-items', (req, res) => {

    Item.find().then(result => {

        res.render('index', { items: result });
    }).catch(err => console.log(err))
})
app.get('/add-item', (req, res) => {
    res.render('add-item');
})

app.post('/items', (req, res) => {
    console.log(req.body)
    const item = Item(req.body);
    item.save().then(() => {
        res.redirect('/get-items')
    }).catch(err => console.log(err))

})
app.get('/items/:id', (req, res) => {
    const id = req.params.id;
    Item.findById(id).then(result => {
        console.log('result', result);
        res.render('item-detail', { item: result })
    })
})
app.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    Item.findByIdAndDelete(id).then(result => {
        res.json({ redirect: '/get-items' })
    })
})
app.put('/items/:id', (req, res) => {
    const id = req.params.id;
    Item.findByIdAndUpdate(id, req.body).then(result => {
        res.json({ msg: 'Updated Successfully' })
    })
})

app.use((req, res) => {
    res.render('error');
})


