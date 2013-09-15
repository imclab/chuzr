//Created using http://pixelhandler.com/blog/2012/02/09/develop-a-restful-api-using-node-js-with-express-and-mongoose/
// as reference.
module.exports = function (app) {
    //May not need to be duplicated. Rough draft.
    function validateProductId(id) {
        if (/\D/.test(id)) {
        throw Error('Illegal id')
        }
    return id;
    };
  
    //Get all the products
    app.get('/products', function (req, res) {
        console.log("Status Code: ", res.statusCode);
        skip = +req.query.skip || 0; 
        limit = +req.query.limit || 10; 
        console.log('skip = %d, limit = %d', skip, limit);
        res.json(User.findAll(skip=skip, limit=limit));
    });
    
    //Create a new project
    app.post('/products', function (req, res) {
        /*console.log("Adding new product:");
          console.log(req.body);
          To be fleshed out when product model is created.*/
        var product = new Product();
        //Assuming we are using the mongoose model.js
        product.save(function (error) {
            if (!error) {
                return res.send("product added");
            } else {
                return res.send(error);
            }
        });
        return res.send(product);
    });
    
    //Get a product by id
    app.get('/prodcuts/:id', function (req, res) {
        id = validateProductId(req.params.id);
        try {
            res.json(Product.findById(id));
        } catch (e) {
            if (e == Product.NO_SUCH_PRODUCT) {
                res.send(400, 'No such product');
            } else {
                throw e;
            }     
        }
  });
  
  //Update a product
    app.put('/products/:id', function (req, res) {
        var id = validateProductId(req.params.id),
        product = Product.findById(id);
        return product.save(function (error) {
            if (!error) {
                res.send("Product updated");
            } else {
                return res.send(error);
            }
        });
        return res.send(product);
    });
}
