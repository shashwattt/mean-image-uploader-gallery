const express = require('express');
const router = express.Router();
var GalleryItem = require('../models/galleryItem');

router.get('/', (req, res) => {
  console.log("Get All Records")
  GalleryItem.find()
      .exec(function(err, galleryItems){
          if(err){
              return res.status(500).json({
                status: 'failed',
                error: error
              });
          }
          res.status(200).json({
            status: 'success',
            obj: galleryItems
          });
  });
});

router.delete('/delete/:id',function(req, res, next){
    console.log("Going to delete ", req.params.id)
    GalleryItem.findById(req.params.id,function(err, item){
         if(err){
             return res.status(500).json({
                 status: 'An error occured',
                 error: err
             });
         }
         if(!item){
             return res.status(500).json({
                 status: 'Item not found ',
                 error: err
             });
         }
         item.isDeleted = true;
         item.save(function(err, result){
             if(err){
                 return res.status(500).json({
                    status: 'failed',
                    error: error
                 });
             }
             console.log('Deletion successful');
             res.status(200).json({
                 status: 'success',
                 obj: result
             });
         });
    }); 
 });

router.post('/deleteMultiple/',function(req, res, next){
    let list = req.body;
    if(list && list.length>0){
        var updates = [];
        list.forEach(function(obj) {
            var updatePromise = GalleryItem.update({_id: obj}, {$set: {isDeleted: true}});
            updates.push(updatePromise);
        });
        Promise.all(updates).then(function(results){
            console.log(results);
            res.status(200).json({
                status: 'success',
                obj: results
            });
        });
    }
});

module.exports = router;