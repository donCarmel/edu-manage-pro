'use strict';
class ApiResponse {
  static success(res, data, message = 'Succès', statusCode = 200) {
    return res.status(statusCode).json({ success: true, message, data });
  }
  static created(res, data, message = 'Créé avec succès') {
    return res.status(201).json({ success: true, message, data });
  }
  static error(res, message = 'Erreur serveur', statusCode = 500, errors = null) {
    return res.status(statusCode).json({ success: false, message, ...(errors && { errors }) });
  }
  static notFound(res, message = 'Ressource introuvable') {
    return res.status(404).json({ success: false, message });
  }
  static forbidden(res, message = 'Accès refusé') {
    return res.status(403).json({ success: false, message });
  }
  static unauthorized(res, message = 'Non authentifié') {
    return res.status(401).json({ success: false, message });
  }
  static badRequest(res, message = 'Données invalides', errors = null) {
    return res.status(400).json({ success: false, message, ...(errors && { errors }) });
  }
  static paginated(res, rows, count, page, limit, message = 'Succès') {
    return res.status(200).json({
      success: true, message, data: rows,
      pagination: { total: count, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(count / limit) },
    });
  }
}
module.exports = ApiResponse;
