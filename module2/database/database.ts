import { Sequelize } from "sequelize";
import config from "../config";
import { UserModel, GroupModel } from "./entities/User";

const {host, database, password, user, port} = config.get("db");

export const sequelize = new Sequelize(database, user, password, {
  dialect: "postgres",
  host,
  port,
  dialectOptions: {
    ssl: true
  }
});

(async () => {

  await sequelize.sync();

  // User.create({
  //   "login": "Alex",
  //   "password": "123test",
  //   "age": 15
  // });

  // User.create({
  //   "login": "Robin",
  //   "password": "asd456A",
  //   "age": 20
  // });
  // "041b7ddb-0e7e-41cc-b7e2-c51ec8e5c0bc"

  // const group1 = await Group.create({
  //   name: 'Group1',
  //   permissions: ['READ']
  // })

  // group1.setUsers([
  //   "041b7ddb-0e7e-41cc-b7e2-c51ec8e5c0bc",
  //   "d254c057-eba8-4c30-b96a-d01d6d837765"
  // ])

  // User.destroy({
  //   where: {id: "041b7ddb-0e7e-41cc-b7e2-c51ec8e5c0bc"}
  // });

})();
