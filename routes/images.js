const express = require('express');
const router = express.Router();
const Image = require('../model/image');
const auth = require('../middleware/auth');

// @routes  GET /api/images
// @desc    get all images
// access   public
router.get('/', async (req, res) => {
  try {
    const images = await Image.find({});
    res.json(images);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @routes  GET /api/images/:id
// @desc    get single image
// access   public
router.get('/:id', async (req, res) => {
  try {
    const image = await Image.findOne({ _id: req.params.id });
    if (image) {
      res.json(image);
    } else {
      res.status(400).json({ msg: 'No image found' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @routes  POST /api/images
// @desc    create an image
// access   private
router.post('/', auth, async (req, res) => {
  const { title, imageUrl, description } = req.body;
  try {
    const newImage = new Image({
      title,
      imageUrl,
      description,
      user: req.user.id,
    });

    const image = await newImage.save();
    res.json(image);
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @routes  PUT /api/images/edit/:id
// @desc    edit an image
// access   private
router.put('/:id', auth, async (req, res) => {
  const { title, imageUrl, description } = req.body;

  // build image object
  const imageFields = {};
  if (title) imageFields.title = title;
  if (imageUrl) imageFields.imageUrl = imageUrl;
  if (description) imageFields.description = description;
  try {
    let image = await Image.findById(req.params.id);

    if (!image) return res.status(404).json({ msg: 'Image not found' });

    // make sure user owns the image
    if (image.user.toString() !== req.user.id)
      res.status(401).json({ msg: 'Not authorized' });

    image = await Image.findByIdAndUpdate(
      req.params.id,
      { $set: imageFields },
      { new: true },
    );

    res.json(image);
  } catch (error) {
    console.error('error', error.message);
    res.status(500).send('Server Error');
  }
});

// @routes  DELETE /api/images/:id
// @desc    delete an image
// access   private
router.delete('/:id', auth, async (req, res) => {
  try {
    let image = await Image.findById(req.params.id);

    if (!image) return res.status(404).json({ msg: 'Image not found' });

    // Make sure user owns contact
    if (image.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Image.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Image removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
