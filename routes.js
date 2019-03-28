const express = require('express');
const data = require('./data.json');

const router = express.Router();

router.get('/', (req,res) => {
    res.redirect('/categories')
});

router.get('/categories', (req,res) => {
    res.render('partials/categories', data);
});



router.get('/categories/:category', (req,res) => {
    let categoryName = req.params.category;
    let categoryObj = data.categories.find((category) => {
        return category.name == categoryName;

    });

    res.render('partials/products', {category:categoryObj});
});



router.get('/categories/:category/:product', (req,res) => {
    let categoryName = req.params.category;
    let productName = req.params.product;
    
    let categoryObj = data.categories.find((category) => {
        return category.name == categoryName;
    });

    let productObj = categoryObj.Products.find((product) => {
        return product.name == productName;
    });


    res.render('partials/product', productObj);
});



// router.get('/categories/:id', (req,res) => {
//     let id = req.params.id;
//     let products = data.puppies.find((products) => {
//         return products.id == id;
//     });

//     res.render('partials/products', products);
// });


// router.get('/products/:id', (req,res) => {
//     let id = req.params.id;
    
//     let puppy = puppies.puppies.find((puppy) => {
//         return puppy.id == id;
//     });

//     res.render('puppies/edit', puppy);
// });

// router.post('/puppies/edit/:id', (req,res) => {

//     let updatedPuppy = {
//         id: req.params.id,
//         name: req.body.name,
//         owner: req.body.owner,
//         image: req.body.image,
//         breed: req.body.breed,
//     }

//     puppies.puppies.forEach((puppy, index) => {
//         if(puppy.id == updatedPuppy.id)
//             puppies.puppies[index] = updatedPuppy;

//     });

//     let dataToWrite = JSON.stringify(puppies,null,2);
//     if (process.env.NODE_ENV != "test"){
//         write('./data.json', dataToWrite);
//     }
//     res.redirect('/puppies/'+ req.params.id);
// });

module.exports = router;