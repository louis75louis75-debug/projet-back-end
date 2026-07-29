const prisma = require('../lib/prisma')

module.exports = async (req, res) => {
  const { name, rating, description } = req.body

  try {
    // 1. On prépare les données de base
    const reviewData = {
      name: name || "Visiteur anonyme",
      rating: parseInt(rating),
      description: description,
      date: new Date(),
    }

    // 2. Si l'utilisateur est connecté (token valide présent), on attache son userId
    if (req.user && req.user.id) {
      reviewData.userId = parseInt(req.user.id)
    }

    // 3. Création de l'avis dans Prisma (marche avec ou sans userId)
    const newReview = await prisma.review.create({
      data: reviewData
    })

    return res.status(201).json({
      error: false,
      message: "Avis créé avec succès",
      review: newReview
    })

  } catch (error) {
    console.error('Erreur Prisma dans post.controllers :', error)
    
    return res.status(500).json({
      error: true,
      message: "Erreur interne lors de la création de l'avis"
    })
  }
}