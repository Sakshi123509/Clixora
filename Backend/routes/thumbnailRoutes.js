// import express from 'express';
// import {
//     deleteThumbnail,
//     saveThumbnail,
//     fetchThumbnail,
// } from "../controllers/thumbnailController.js";
// import { generateThumbnail } from "../controllers/generateController.js"; // 🚀 Imported here
// import { saveCanvasExport } from "../controllers/editorController.js";
// import isAuth from "../middleware/isAuth.js";

// const router = express.Router();

// // URL http://localhost:8000/api/thumbnails/generate
// router.post('/generate', isAuth, generateThumbnail);

// // URL  http://localhost:8000/api/thumbnails/canvas/save
// router.post("/canvas/save", isAuth, saveCanvasExport); 
// router.get('/thumbnails', isAuth, fetchThumbnail);
// router.post('/thumbnails', isAuth, saveThumbnail);
// router.delete('/thumbnails/:id', isAuth, deleteThumbnail);

// export default router;
import express from 'express';
import {
    deleteThumbnail,
    saveThumbnail,
    fetchThumbnail,
} from "../controllers/thumbnailController.js";
import { generateThumbnail } from "../controllers/generateController.js"; 
import { saveCanvasExport } from "../controllers/editorController.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

// 🚀 TESTING BYPASS: 'isAuth' ko temporary hata diya taaki token ka jhanjhat na ho!
router.post('/generate', generateThumbnail);
router.post("/canvas/save", saveCanvasExport);

// Baki dashboard features ko abhi ke liye protected rakh sakte hain (ya test karne ke liye unhe bhi bypass kar sakte hain)
router.get('/thumbnails', isAuth, fetchThumbnail);
router.post('/thumbnails', isAuth, saveThumbnail);
router.delete('/thumbnails/:id', isAuth, deleteThumbnail);

export default router;