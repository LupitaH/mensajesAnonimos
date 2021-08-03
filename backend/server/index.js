
const { ApolloServer, PubSub } = require('apollo-server')
const fs = require('fs')
const path = require('path')
const { prisma } = require('./generated/prisma-client')
const resolvers = require('./resolvers.js')

const server = new ApolloServer({
  typeDefs:fs.readFileSync( 
    path.join(__dirname, 'schema.graphql'), 'utf8') ,
  resolvers,
  context: ({ req }) => {
    return {...req, prisma}}
});

server.listen().then(({ url }) =>
  console.log(`Server is running on ${url}`)
);