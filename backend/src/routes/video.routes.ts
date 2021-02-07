import { Router } from 'express';
import * as videoCtrl from '../controllers/video.controller'

const router: Router = Router();

router.get('/videos/:id', videoCtrl.getVideo);
router.get('/videos', videoCtrl.getVideos);
router.post('/videos', videoCtrl.createVideo);
router.put('/videos/:id', videoCtrl.updateVideo);
router.delete('/videos/:id', videoCtrl.deleteVideo);

export default router;