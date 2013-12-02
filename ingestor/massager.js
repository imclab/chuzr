var Massager = function () {

  var _products = function (shopzillaObject, category) {
    var chuzrProducts = [];
    if (shopzillaObject) {
      var shopzillaProducts = shopzillaObject.products.product;
      for (p in shopzillaProducts) {
        var chuzrProduct = _product(shopzillaProducts[p], category);
        chuzrProducts.push(chuzrProduct);
      };
    }
    return chuzrProducts;
  };

  var _images = function (imageObject) {
    var shopzillaImages = imageObject.images,
        chuzrImages = {};

    if (shopzillaImages !== undefined) {
      for (i in shopzillaImages) {
        var image = shopzillaImages[i];
        chuzrImages[image.xsize] = image.value;
      }
    }

    return chuzrImages;
  };

  var _product = function (shopzillaProduct, category) {
    var chuzrProduct =  {
        "name" : shopzillaProduct.title,
        "brand" : (shopzillaProduct.brand) ? shopzillaProducts[p].brand.name : null,
        "description" : shopzillaProduct.description,
        "images" : massageImages(shopzillaProduct.images),
        "url" : shopzillaProduct.url.value,
        "price" : {
            "max" : (shopzillaProduct.priceSet) ? (shopzillaProduct.priceSet.maxPrice.value) : (shopzillaProduct.price.value),
            "min" : (shopzillaProduct.priceSet) ? (shopzillaProduct.priceSet.minPrice.value) : (shopzillaProduct.price.value)
        },
        "shopzillaId" : shopzillaProduct.id,
        "category" : category
    };
    return chuzrProduct;
  };

  var _taxonomy = function (taxonomyTree) {
    return taxonomyTree;
  };

  return {
    images: _images,
    product: _product,
    products: _products,
    taxonomy: _taxonomy
  };

}();

module.exports = Massager;
