const swag = require('../models/swag')
console.log(swag)

module.exports = {
    read: (req,res,next)=>{
        res.status(200).send(swag)
    }
}