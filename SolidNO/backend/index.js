const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");

app.use(express.json());
app.use(cors());

//Соединение с СУБД MongoDB
mongoose.connect("mongodb+srv://FrontendBoy:V1ctoryAppearance@cluster0.f0fbw0f.mongodb.net/web-site");

//API creation

app.get("/",(req,res)=>{
    res.send("Express запущен (сервер)")
})

//Хранилище изображений на диске
const storage=multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//Создание конечной точки для загрузки изображений
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//Сущность для продукта для БД

const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true, 
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
})
app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Сохранено");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//Создание API для удаления товара из списка доступных
app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//Создание API для получения всех товаров
app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log("Все товары извлечены");
    res.send(products);
})

//Сущность для пользователя
const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//Создание конечной точки для регистрации пользователя
app.post('/signup', async (req,res)=>{

    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"Пользователь с таким email уже существует"})
    }
    let cart = {};
    for (let index = 0; index < 300; index++) {
        cart[index]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

//Создание конечной точки для входа в профиль пользователя
app.post('/login',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Неверный пароль!"});
        }
    }
    else{
        res.json({success:false,errors:"Неверный email!"})
    }
})

//Создание конечной точки для создания новой коллекции товаров
app.get('/newcollections',async (req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("Новая коллекция извлечена!");
    res.send(newcollection);
})

//Создание конечной точки для популярного в женском 
app.get('/popularinwomen',async (req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("Популярное в женском извлечено");
    res.send(popular_in_women);
})

//Middleware для извлечения пользователя
const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Пожалуйста, авторизуйтесь"});
    }
    else{
        try {
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"Пожалуйста, авторизуйтесь"});
        }
    }
}

//Создание конечной точки для добавления продукта в корзину
app.post('/addtocart',fetchUser,async (req,res)=>{
    console.log("Добавлено",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Добавлено");
})

//Создание конечной точки для удаления товара из корзины
app.post('/removefromcart',fetchUser,async (req,res)=>{
    console.log("Удалено",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Удалено");
})

//Создание конечной точки для получения продуктов в корзине
app.post('/getcart',fetchUser, async (req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port,(error)=>{
    if(!error){
        console.log("Сервер запущен на порту " + port)
    }
    else{
        console.log("Ошибка: " + error)
    }
})