
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'BusTimes' });
};


exports.busTimes = function(db) {
    return function(req, res) {
      db.data.find({time: {$gte: 0}}).sort({time:1}).limit(6, function(e,docs){
          res.render('busTimes', {
                "busTimes" : docs
            });
        });
    };
};

