const path = require('path');
const {GraphQLServer} = require('graphql-yoga');
const {prisma} = require('./generated/javascript-client');

const resolvers = require('./resolvers.js');
const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, 'schema.graphql'),
  resolvers,
  context: req => ({
    ...req,
    prisma,
  }),
});

const options = {
  port: 8000,
  cors: {
    origin: '*',
  },
};

server.start(options, args =>
  console.log(`Server is running on http://localhost:${args.port}`)
);


/*const path = require('path');
const { ApolloServer } = require('apollo-server');
//const { PrismaClient } = require('@prisma/client');
const {prisma} = require('./generated/javascript-client');
//const {importSchema}=require('graphql-import')
//const fs = require('fs')

//const prisma = new PrismaClient();
const typeDefs =  path.resolve(__dirname, 'schema.graphql');
const resolvers = require('./resolvers.js');

/*const db = new Prisma({
    typeDefs: path.resolve(__dirname, 'generated/prisma-schema.graphql'),//'generated/prisma-schema.graphql'),
    endpoint: 'http://localhost:4466'
});*/
/*const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: ({req})=>({
        ...req,
        prisma
    })
});

server.listen(4000).then(({url}) => {
  console.log(`🚀 Server ready at ${url}`);
});

*/