

const prisma = require("../lib/prisma")

module.exports = async (req, res) => {
  try {
    // 💡 On utilise findMany() pour récupérer TOUS les avis, pas un seul
    const reviews = await prisma.review.findMany({
      orderBy: {
        date: "desc" // Les plus récents en premier
      }
    })

    return res.status(200).json(reviews)
  } catch (error) {
    console.error("Erreur GET /avis :", error)
    return res.status(500).json({ error: "Erreur serveur lors de la récupération des avis" })
  }
}
