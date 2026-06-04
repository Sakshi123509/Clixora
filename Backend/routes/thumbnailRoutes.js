import express from 'express';
import {
    deleteThumbnail,
    saveThumbnail,
    fetchThumbnail
} from "../controllers/thumbnailController.js";
import isAuth from "../middleware/isAuth.js";


const router = express.Router();

router.get('/thumbnails', isAuth, fetchThumbnail);
router.post('/thumbnails', isAuth, saveThumbnail);
router.delete('/thumbnails/:id', isAuth, deleteThumbnail);

export default router;