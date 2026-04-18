'use strict';
const paginate = (query) => {
  const page  = Math.max(1, parseInt(query.page)  || 1);
  const limit = Math.min(100, parseInt(query.limit) || 20);
  return { page, limit, offset: (page - 1) * limit };
};
module.exports = paginate;
