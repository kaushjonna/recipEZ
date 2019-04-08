"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Creation",
    embedded: false
  },
  {
    name: "Comment",
    embedded: false
  },
  {
    name: "Saved_Recipe",
    embedded: false
  },
  {
    name: "Ingredient",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://eu1.prisma.sh/nik-malhotra-1a119d/recipez/dev`
});
exports.prisma = new exports.Prisma();
