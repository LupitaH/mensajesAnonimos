const { prisma } = require('./generated/javascript-client')

const Query= {
    users: (parent, args, ctx, info) => ctx.prisma.users({}, info)
}

module.exports = { Query }