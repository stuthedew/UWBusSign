
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'BusTimes' });
};


exports.busTimes = function(db) {

    return function(req, res) {
try{
      db.runCommand({aggregate: "data", pipeline: [{$group: {_id:0, minTime: {$min: "$uTime"}}}]}, function(err, r){
      var upTime = r.result[0].minTime;
      db.data.find({uTime: upTime}).sort({time:1}).limit(6, function(e,docs){
          res.render('busTimes', {
                "busTimes" : docs
            });

            });
        });
}
    finally{};
    };
};
