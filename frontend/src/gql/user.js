import { gql } from '@apollo/client';

export const REGISTER = gql`
    mutation($user: String!, $password: String!){
        createUser(user: $user, password: $password) {
            id
            password
            user
        }
    }
`;

export const LOGIN = gql`
    query($user: String!, $password: String!){
        userLogin(user: $user, password: $password) {
            id
            password
            user
        }
    }
`;