"use strict";
const db = require("../models");
const BaseService = require("./BaseService");

class StudentService extends BaseService {
  constructor() {
    super(db.Student, [
      { model: db.Class, as: "class", required: false },
      {
        model: db.Parent,
        as: "parents",
        through: { attributes: ["isPrimary"] },
        required: false,
      },
    ]);
  }
}

module.exports = new StudentService();
