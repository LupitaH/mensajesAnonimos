const { prisma } = require('./generated/prisma-client')
const bcryptjs = require('bcryptjs')

const Query = {

    users: async (root, args, context) => {
        try {
            return await prisma.users({})
        } catch (err) {
            console.log(err)
        }
    },
    userLogin: async (root, args, context) => {
        try {
            const result = await prisma.users({
                where: { user: args.user }
            });

            if (result[0] != null) {
                const pass = await bcryptjs.compare(args.password, result[0].password)
                if (pass) {
                    console.log(result)
                    return result
                }
            }
        } catch (err) {
            console.log(err)
        }
    },

    messages: async (root, args, context) => {
        try {
            return await prisma.messages({
                where: { user: args.user }
            })
        } catch (err) {
            console.log(err)
        }

    },
    messageRandom: async (root, args, context) => {
        try {
            const max = await prisma.messagesConnection().aggregate().count()
            const num = Math.floor((Math.random() * (max - 1)) + 1)
            console.log(num)
            return await prisma.messages({
                first: 1,
                skip: num,
            })
        } catch (err) {
            console.log(err)
        }
    }

}

const Mutation = {

    createUser: async (root, args, context) => {
        try {
            const salt = await bcryptjs.genSaltSync(10)
            const pass = await bcryptjs.hash(args.password, salt)
            return await prisma.createUser({
                user: args.user, password: pass
            })
        } catch (err) {
            console.log(err)
        }
    },

    createMessage: async (root, args, context) => {
        try {
            return await prisma.createMessage({
                user: args.user, message: args.message
            })
        } catch (err) {
            console.log(err)
        }
    },
    updateMessage: async (root, args, context) => {
        try {
            return await prisma.updateMessage({
                data: { message: args.message }, where: { id: args.id }
            })
        } catch (err) {
            console.log(err)
        }
    },
    deleteMessage: async (root, args, context) => {
        try {
            return await prisma.deleteMessage({
                id: args.id
            })
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = { Query, Mutation }