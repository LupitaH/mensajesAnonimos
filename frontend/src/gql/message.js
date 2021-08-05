import { gql } from '@apollo/client';

export const RANDOM = gql`
    query{
        messageRandom {
        id
        message
        user
        }
    }
`;

export const MENSAJES = gql`
    query($user: String){
        messages(user: $user) {
            id
            message
            user
         }
    }   
`;

export const CREARMENSAJE = gql`
    mutation($user: String!, $message: String!){
        createMessage(user: $user, message: $message) {
            id
            message
            user
        }
    }
`;

export const EDITARMENSAJE = gql`
    mutation($id: ID!, $message: String!){
        updateMessage(id: $id, message: $message) {
            id
            message
            user
        }
    }
`;

export const ELIMINARMENSAJE = gql`
    mutation($id: ID!){
        deleteMessage(id: $id) {
        id
        }
    }
`;