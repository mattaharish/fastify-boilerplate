'use strict';

const Knex = require('knex');

const PAGE_SIZE = 10;
const CURRENT_PAGE = 1;

const EXCLUDED_ATTR_FROM_COUNT = ['order', 'columns', 'limit', 'offset', 'group', 'select'];

function paginate({ pageSize = PAGE_SIZE, currentPage = CURRENT_PAGE, distinctWith }) {
  // eslint-disable-next-line no-invalid-this
  const countByQuery = this.clone();

  const page = Math.max(currentPage || 1);
  const offset = (page - 1) * pageSize;

  /**
   * Remove statements that will make things bad with count
   * query, for example `orderBy`
   */
  // eslint-disable-next-line no-underscore-dangle
  countByQuery._statements = countByQuery._statements.filter(statement => {
    return !EXCLUDED_ATTR_FROM_COUNT.includes(statement.grouping);
  });

  if (distinctWith) {
    countByQuery.countDistinct(`${distinctWith} as total`);
  } else {
    countByQuery.count('* as total');
  }

  // eslint-disable-next-line no-invalid-this
  return Promise.all([countByQuery.first(), this.offset(offset).limit(pageSize)]).then(
    ([counter, result]) => {
      const total = Number(counter.total);
      return {
        data: result,
        meta: {
          pagination: {
            total,
            page,
            page_size: pageSize,
            total_pages: Math.ceil(total / pageSize)
          }
        }
      };
    }
  );
}

module.exports = function setupPagination(knex) {
  Knex.QueryBuilder.extend('paginate', paginate);
};
