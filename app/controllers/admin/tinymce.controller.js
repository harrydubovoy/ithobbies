const fs = require('fs');

const uploadImage = (req, res) => {
    fs.readFile(req.file.path, (err) => {

        if( err ){
            console.error( err );
            const response = {
                "uploaded": 0,
                "fileName": req.file.originalname,
                "error": {
                    "message": "Sorry, file couldn\'t be uploaded."
                }
            };
            res.json(response)
        } else {
            const response = {
                "location": `/uploads/images/${req.file.originalname}`
            };
            res.json(response);
        }
    })
};

module.exports = {
    uploadImage
};