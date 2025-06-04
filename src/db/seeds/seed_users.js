const { hashPassword } = require('../../helpers/users.helper');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  // User hashed password
  const adminPassword = await hashPassword(process.env.ADMIN_PASSWORD);
  const yukiPassword = await hashPassword(process.env.YUKI_PASSWORD);
  const pierrePassword = await hashPassword(process.env.PIERRE_PASSWORD);

  // Seed users
  await knex('users').insert([
    {
      username: 'kekedezha',
      email: 'dezha6@hotmail.com',
      password: adminPassword,
      first_name: 'Christian',
      last_name: 'Dezha',
      address: 'Charlotte, NC',
    },
    {
      username: 'youkey',
      email: 'yuki@gmail.com',
      password: yukiPassword,
      first_name: 'Yuki',
      last_name: 'Dezha',
      address: 'Charlotte, NC',
    },
    {
      username: 'peeyerre',
      email: 'pierre@gmail.com',
      password: pierrePassword,
      first_name: 'Pierre',
      last_name: 'Rivas',
      address: 'Charlotte, NC',
    },
  ]);
};
