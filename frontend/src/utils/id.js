import { IDUSER } from './constants'

export function setId(id) {
    localStorage.setItem(IDUSER, id);
}

export function getId() {
    return localStorage.getItem(IDUSER);
}

export function removeId() {
    localStorage.removeItem(IDUSER);
}