/**
 * ============================================================================
 *  lib/prisma.js — Connexion à la base de données via Prisma
 * ============================================================================
 *
 *  Prisma est un ORM (Object-Relational Mapping) : il permet de manipuler la
 *  base de données avec du code JavaScript (prisma.user.create(), findMany()...)
 *  plutôt qu'avec des requêtes SQL écrites à la main.
 *
 *  Le schéma des tables est défini dans le fichier prisma/schema.prisma.
 *
 *  Documentation officielle :
 *   - Prisma Client      : https://www.prisma.io/docs/orm/prisma-client
 *   - Bonnes pratiques   : https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections
 *   - Logging            : https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/logging
 * ============================================================================
 */

const { PrismaClient } = require("@prisma/client")

let prisma

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    log: ["warn", "error"],
  })
} else {
  // En développement, on réutilise l'instance globale pour éviter
  // de multiplier les connexions lors du Hot Reload.
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ["warn", "error"],
    })
  }
  prisma = global.prisma
}

module.exports = prisma
