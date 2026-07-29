module.exports = async (req, res) => {
  try {
    return res.json({
      message: "Bienvenue sur l'API de gestion des avis !",
      status: "online",
      endpoints: {
        get: [
          { endpoint: '/avis', description: 'Récupérer tous les avis' },
          { endpoint: '/avis/:id', description: 'Récupérer un avis par son ID' }
        ],
        post: [
          { endpoint: '/add/avis', description: 'Ajouter un nouvel avis' },
          { endpoint: '/register', description: 'Créer un compte utilisateur' },
          { endpoint: '/login', description: 'Se connecter' }
        ]
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Erreur serveur sur l'accueil API"
    });
  }
};