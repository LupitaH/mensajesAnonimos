const { prisma } = require('./generated/prisma-client')

const Query= {

    users: async (root, args, context) => {
        return await prisma.users({ 
            where: { AND: [
                { user: args.user }, { password: args.password } ] } })
    },

    messages: async (root, args, context) => {
        return await prisma.messages({ 
            where: { user: args.user } })
    },

    messageRandom: async (root, args, context) => {
        const max = await prisma.messagesConnection().aggregate().count()
        const num = Math.floor((Math.random() * (max-1)) + 1)
        console.log(num)
        return await prisma.messages({
            first: 1,
            skip: num,
        })
    }

}

const Mutation = {

    createUser: async(root, args, context)=>{
        return await prisma.createUser({
            user: args.user, password: args.password })
    },

    createMessage: async(root, args, context)=>{
        return await prisma.createMessage({
            user: args.user, message: args.message })
    },
    updateMessage: async(root, args, context)=>{
        return await prisma.updateMessage( {
            data:{message: args.message}, where: { id: args.id } })
    },
    deleteMessage: async(root, args, context)=>{
        return await prisma.deleteMessage( {
            id: args.id })
    }

}

module.exports = { Query, Mutation }