const { Router } = require('express')

const router = Router()


router.get('/chat', (req, res)=>{
    res.render('chat', {})
})



module.exports = router