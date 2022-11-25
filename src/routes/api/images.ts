import express from 'express';
import resize from '../../utilities/resize';

const images = express.Router();

images.get('/', (req, res) => {
    resize(req, res);
});

export default images;
