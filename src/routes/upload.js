const express = require('express');
const { multerUploads, dataUri } = require('../multer');
const { cloudinaryConfig, uploader } = require('../config/cloudinaryConfig');

const router = express.Router();

router.post('/', multerUploads, async (req, res) => {
    console.log('req.body: ', req.body);
    console.log('req.file: ', req.file);

    if (req.file) {
        const file = dataUri(req).content;
        console.log('file --> ', file);
        try {
            const response = await uploader.upload(file);
            const image = response.url;
            return res.status(200).json({
                success: 1,
                file: {
                    url: image,
                    // ... and any additional fields you want to store, such as width, height, color, extension, etc
                },
            });
        } catch (error) {
            console.log('Encounterred an Error', error);
            res.status(400).json({
                messge: 'Error....!!',
                data: {
                    error,
                },
            });
        }
    }
});

router.get('/', async (req, res) => {
    res.send('I m, Upload Route Handler');
});

module.exports = router;
