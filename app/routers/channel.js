const express = require('express');
const router  = express.Router();

const mongoose = require("mongoose")
const Channel = mongoose.model("Channel")


router.get('/list', async function(req, res, next) {
    
    try {
       const projection =   { 
                   // __v: false,
                    name: true,
                    title: true,
                    updatedAt: true
        };
       const query = Channel.find({}, projection, { limit: 10 }).sort({updatedAt: 'desc'})
       const channels = await query.exec()
       res.json(channels)
    }catch (error) {
        //FIXME: should send error.errors
        res.status(400).json(error)
    }
});

router.post('/create', async function(req, res, next) {
    // WARN: Not good in all caes, avoid using wildcard fields update if any sensitive data present
    const channel = new Channel(req.body)
    //const error = channel.validateSync();
    //res.json(error)

    try {
       await channel.save()
       res.json(channel)
    }catch (error) {
        console.log(error)
        //FIXME: should send error.errors

        if ('code' in error && error.code == 11000 ) {
            res.status(400).json({'error': 'dplicated error'})
            return
        }
        
        if ('errors' in error) {
            res.status(400).json(error)
            return
        }

        res.status(500).json({error: 'Server error'})
    }
    
});


router.put('/update/:id', async function(req, res, next) {
     
    try {
       const channel = await Channel.findByIdAndUpdate(req.params.id, { $set: req.body}, { new: true })
       res.json(channel)
    }catch (error) {
        //FIXME: should send error.errors
        res.status(400).json(error)
    }
    
});

router.patch('/update/:id', async function(req, res, next) {
   
    try {
        const channel = await Channel.findById(req.params.id)
        if (!channel) {
            res.status(404).json("channel not found")
            return
        }
        channel.set(req.body)
        const savedChannel = await channel.save()
        res.json(savedChannel)
    }catch(error) {
        res.status(400).json(error)
    }
     
    
});


router.delete('/delete/:id', async function(req, res, next) {
   
    try {
       const channel = await Channel.findByIdAndRemove(req.params.id)
       if (!channel) {
           res.status(404).json({'error': 'channel not found'})
           return
       }
       res.statusCode(200)
    }catch(error) {
        res.status(400).json(error)
    }
});

module.exports = router;
