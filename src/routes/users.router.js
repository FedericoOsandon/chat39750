const { Router } = require('express')

// obj
const router = Router()

let usuarios = [
    { id: '1', nombre: 'nombre 1', apellido: 'apellido 1', genero: 'F' },
    { id: '2', nombre: 'nombre 2', apellido: 'apellido 2', genero: 'F' },
    { id: '3', nombre: 'nombre 3', apellido: 'apellido 3', genero: 'M' },
    { id: '4', nombre: 'nombre 4', apellido: 'apellido 4', genero: 'F' },
    { id: '5', nombre: 'nombre 5', apellido: 'apellido 5', genero: 'M' },
    { id: '6', nombre: 'nombre 6', apellido: 'apellido 6', genero: 'M' },
    { id: '7', nombre: 'nombre 7', apellido: 'apellido 7', genero: 'F' },
    { id: '8', nombre: 'nombre 8', apellido: 'apellido 8', genero: 'M' }
]

function mid1(req, res, next) {
    // req.dato1='dato uno'

    res.send('No tenes permiso para ver los usuarios')
}

function mid2(req, res, next) {
    req.dato2='dato dos '
    next()
}

router.use(mid2)

router.get('/',  (request, response)=>{
    
    const { genero } = request.query

    // if (!genero || (genero!=='M'&&genero!=='F')) {
    //     return response.send({usuarios})
    // }

    let userFilter = usuarios.filter(user => user.genero === genero)

    response.send({datos: request.dato2})
})

// POST http://localhost:8080 /usuarios
router.post('/', (req, res)=>{
    let user = req.body

    if(!user.nombre || !user.apellido){ 
        return res.status(400).send({status:'error', mensaje: 'todos los campos son necesarios'})
    }
    usuarios.push(user)
    res.status(200).send({usuarios})
})

// PUT http://localhost:8080 /usuarios
router.put('/:pid', (req, res) => {
    const { pid } = req.params
    const user = req.body

    // validar pid 
    // if(!id)   
    // validar campos 
    if(!user.nombre || !user.apellido){ 
        return res.status(400).send({status:'error', mensaje: 'todos los campos son necesarios'})
    }
    // buscar por pid user
    const index = usuarios.findIndex(usuario => usuario.id === pid)   
    //validar que exista
    if(index === -1) res.send({status: 'error', message: 'No existe el usuario'})

    usuarios[index] = {id: pid, ...user}

    res.send({usuarios})
})


router.delete('/:uid', (req, res) => {
    let {uid} = req.params
    // buscar por pid user
    const index = usuarios.findIndex(usuario => usuario.id === uid)   
    //validar que exista
    if(index === -1) res.send({status: 'error', message: 'No existe el usuario'})

    usuarios = usuarios.filter(user => user.id !== uid)

    res.send({status: 'success', payload: usuarios})
})

module.exports = router