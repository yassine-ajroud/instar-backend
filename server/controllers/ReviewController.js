const SimpleReview = require('../models/Rating');

exports.createSimpleReview = async (req, res) => {
  try {
    const { user, product, rating } = req.body;

    const newSimpleReview = new SimpleReview({
      user,
      product,
      rating,
    });

    await newSimpleReview.save();

    res.status(201).json({ message: 'Avis simple créé avec succès', review: newSimpleReview });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'avis simple', error: error.message });
  }
};

exports.getAllSimpleReviews = async (req, res) => {
  //   const { productId } = req.params;

  //   SimpleReview.find({ product: productId })
  //  // .populate('user', 'Firstname Lastname') 
  //   .exec()
  //   .then((rating) => {
  //     res.json(rating);
  //   })
  //   .catch((error) => {
  //     res.status(500).json({ message: 'Erreur lors de la récupération des avis simples', error });
  // });
try{
  
  const { productId } = req.params;
    const simpleReviews = await SimpleReview.find({ product: productId });
    arr = Array.from(simpleReviews)
    res.status(200).json(simpleReviews,);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des avis simples', error: error.message });
  }
};

exports.getSimpleReviewById = async (req, res) => {
  try {
    const simpleReview = await SimpleReview.findById(req.params.id);
    if (!simpleReview) {
      return res.status(404).json({ error: 'Avis simple non trouvé.' });
    }
    res.status(200).json(simpleReview);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'avis simple', error: error.message });
  }
};

exports.updateSimpleReview = async (req, res) => {
  try {
    const simpleReview = await SimpleReview.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!simpleReview) {
      return res.status(404).json({ error: 'Avis simple non trouvé.' });
    }
    res.status(200).json(simpleReview);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'avis simple', error: error.message });
  }
};

exports.deleteSimpleReview = async (req, res) => {
  try {
    const simpleReview = await SimpleReview.findByIdAndRemove(req.params.id);
    if (!simpleReview) {
      return res.status(404).json({ error: 'Avis simple non trouvé.' });
    }
    res.status(200).json({ message: 'Avis simple supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'avis simple', error: error.message });
  }
};

exports.getSimpleReviewAverage = async (req,res)=>{
  try{
    sum=0
    const { productId } = req.params;
      const simpleReviews = await SimpleReview.find({ product: productId });
      arr = Array.from(simpleReviews);
    //  console.log(arr)
      arr.forEach(element => { 
        sum+=parseInt(element['rating']) 
      }); 
      res.status(200).json(arr.length >0 ? (sum/arr.length).toFixed(1) : "0.0");
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des avis simples', error: error.message });
    }
};