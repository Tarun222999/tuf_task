import express from 'express'
import { createcodes, listCodes } from '../controllers/codecontroller.js'
import redisCache from '../config/redisconfig.js'
const router=express.Router()



router.get('/listcodes',redisCache.route(),listCodes)
router.post('/createcode',createcodes)

export default router
