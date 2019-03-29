const express = require('express');
const inventory = require('./inventory.json');
const readWrites = require('./read-write');
const cart = require('./cart.json');

const router = express.Router();

router.use(express.static('public'))

let data = {
    inventory:inventory,
    cart:cart
}


router.get('/', (req,res) => {
    res.redirect('/categories')
});

router.get('/categories', (req,res) => {

    res.render('partials/categories', data);
});



router.get('/categories/:category', (req,res) => {
    let categoryName = req.params.category;
    let categoryObj = data.inventory.categories.find((category) => {
        return category.name == categoryName;

    });

    
    let customData = {
        cart:data.cart,
        category:categoryObj
    }


    res.render('partials/products', customData);
});



router.get('/categories/:category/:product', (req,res) => {
    let categoryName = req.params.category;
    let productName = req.params.product;
    
    let categoryObj = data.inventory.categories.find((category) => {
        return category.name == categoryName;
    });

    let productObj = categoryObj.Products.find((product) => {
        return product.name == productName;
    });

    productObj.category = categoryName;

    let customData = {
        cart:data.cart,
        category:categoryName,
        product:productObj
    }

    res.render('partials/product', customData);
});

router.post('/categories/:category/:product', (req,res) => {

    

    let newCartItem = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price
    }

    console.log('cart: ', cart);
    cart.products.push(newCartItem);
   

    let dataToWrite = JSON.stringify(cart,null,2);

    if (process.env.NODE_ENV != "test"){
        readWrites.write('./cart.json', dataToWrite);
    }

    let categoryName = req.params.category;
    let productName = req.params.product;
    
    let categoryObj = data.inventory.categories.find((category) => {
        return category.name == categoryName;
    });

    let productObj = categoryObj.Products.find((product) => {
        return product.name == productName;
    });

    productObj.category = categoryName;

    let customData = {
        cart:data.cart,
        category:categoryName,
        product:productObj
    }

    res.render('partials/product', customData);
});

router.get('/logo.png', (req, res) => {
    res.sendFile(__dirname + '/logo.png')
})

router.get('/logo.png', (req, res) => {
    res.sendFile(__dirname + '/logo.png')
})



    

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