'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // ── 1. Récupérer l'id du rôle "administrateur" (créé par le seeder précédent) ──
    const [rows] = await queryInterface.sequelize.query(
      `SELECT id FROM roles WHERE name = 'administrateur' LIMIT 1`
    );

    if (!rows.length) {
      throw new Error(
        '❌  Rôle "administrateur" introuvable.\n' +
        '   Lance d\'abord : npx sequelize-cli db:seed --seed 20260306000000-seed-roles-permissions.js'
      );
    }

    const roleId = rows[0].id;

    // ── 2. Hash du mot de passe (12 rounds) ──────────────────────────────────
    const passwordHash = await bcrypt.hash('Admin@1234', 12);

    // ── 3. Insérer l'admin ───────────────────────────────────────────────────
    //   Colonnes en snake_case car le modèle est défini avec  underscored: true
    await queryInterface.bulkInsert(
      'users',
      [
        {
          role_id:            roleId,
          first_name:         'Super',
          last_name:          'Admin',
          email:              'admin@edumanage.local',
          password_hash:      passwordHash,
          phone:              null,
          avatar_url:         null,
          status:             'active',
          two_factor_enabled: false,
          two_factor_secret:  null,
          last_login_at:      null,
          last_login_ip:      null,
          password_changed_at: null,
          email_verified_at:  now,   // compte vérifié d'emblée
          created_at:         now,
          updated_at:         now,
        },
      ],
      { ignoreDuplicates: true }  // idempotent : relancer le seeder ne plante pas
    );

    console.log('\n✅  Admin créé avec succès');
    console.log('   Email    : admin@edumanage.local');
    console.log('   Password : Admin@1234  ← change-le après la première connexion !\n');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'users',
      { email: 'admin@edumanage.local' },
      {}
    );
    console.log('🗑️   Admin supprimé');
  },
};