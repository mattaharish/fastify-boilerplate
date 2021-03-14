'use strict';

const createUser = async (fastify, { request }) => {
  const { email, password } = request.body;
  //   const { data: createdUser, error } = '';
  //   if (error) throw error;
  //   return createUser;
  return { email, password };
};

module.exports = { createUser };
