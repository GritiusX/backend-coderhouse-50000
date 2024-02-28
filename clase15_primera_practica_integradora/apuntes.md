Diferencia put y patch: ambos actualizan -> patch solo necesita lo que vas a actualizar y put necesita todo, EJ:

/\*
const user = {
name: "Carlos",
last_name: "Perez"
}

// con put si quiero solo actualizar last_name:
//necesito que se mande asi -> si no mando todo,
//EJ name, entonces cuando actualice me va a dar name: undefined

const userToUpdate = {
name: "Carlos",
last_name: "Perez2"
}

// con patch si quiero solo actualizar last_name: necesito que se mande asi

const userToUpdate = {
last_name: "Perez2"
}
\*/
