"use strict";
module.exports = {
  up: async (qi) => {
    await qi.bulkInsert(
      "roles",
      [
        {
          name: "administrateur",
          label: "Administrateur Système",
          priority_level: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "direction",
          label: "Direction",
          priority_level: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "enseignant",
          label: "Enseignant",
          priority_level: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "infirmier",
          label: "Infirmier / Infirmière",
          priority_level: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "comptable",
          label: "Comptable",
          priority_level: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "parent",
          label: "Parent / Tuteur",
          priority_level: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { ignoreDuplicates: true },
    ); // ← AJOUT

    const modules = [
      "students",
      "teachers",
      "grades",
      "attendance",
      "finance",
      "infirmerie",
      "reports",
      "settings",
    ];
    const actions = ["view", "create", "edit", "delete", "export"];
    const perms = [];
    for (const m of modules) {
      for (const a of actions) {
        if (m === "settings" && ["delete", "export"].includes(a)) continue;
        perms.push({ module: m, action: a, description: `${a} in ${m}` });
      }
    }
    await qi.bulkInsert("permissions", perms, { ignoreDuplicates: true }); // ← AJOUT
  },
  down: async (qi) => {
    await qi.bulkDelete("permissions", null, {});
    await qi.bulkDelete("roles", null, {});
  },
};
