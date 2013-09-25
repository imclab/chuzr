Coupon = require('../models/coupon')

module.exports = function (app) {
  function validateCouponId(id) {
    if (/\D/.test(id)) {
      throw Error('Illegal id');
    }
    return id;
  };
  
  app.get('/coupons', function (req, res) {
    console.log("Status Code: ", res.statusCode);
    skip == +req.query.skip || 0;
    limit = +req.query.limit || 10;
    console.log('skip = %d, limit = %d', skip, limit);
    res.json(Coupon.findall(skip=skip, limit=limit));
  });

  app.post('/coupons', function (req, res) {
    var coupon = new Coupon();
    coupon.save(function (error) {
      return error ? res.send(error) : res.send("coupon added");
    });
  });

  app.get('/coupons/:id', function (req, res) {
    id = validateCouponId(req.params.id);
    try {
      res.json(Coupon.findById(id));
    } catch (e) {
      if (e == Coupon.NO_SUCH_COUPON) {
        res.json(400, 'No such coupon');
      } else {
        throw e;
      }
    }
  });

  app.put('/coupons/:id', function (req, res) {
    id = validateCouponId(req.params.id);
    coupon = Coupon.findById(id);
    coupon.save(function (error) {
      return error ? res.send(error) : res.send("coupon updated");
    });
  });

  app.delete('/coupons/:id', function (req, res) {
    id = validateCouponId(req.params.id);
    coupon = Coupon.findById(id);
    coupon.remove(function (error) {
      return error ? res.send(error) : res.send("coupon removed");
    });
  });
}
  
