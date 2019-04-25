const router = require('express').Router()

const Note = require('../models/Note')

router.get('/notes/add', (req, res)=>{
    res.render('notes/new-note')
})

router.post('/notes/new-note', async (req, res)=>{
    const {title, description} = req.body
    const errors = []
    if(!title){
        errors.push({text: 'Please write a Title'})
    }
    if(!description){
        errors.push({text: 'Please write a Description'})
    }
    if(errors.length > 0){
        res.render('notes/new-note',{
            errors,
            title,
            description
        })
    }else{
        //Almacenamos en base de datos cuando ingrese titulo y descripción
        const newNote = new Note({title, description})
        await newNote.save()
        res.redirect('/notes')
    }
})

router.get('/notes', (req, res)=>{
    res.send('Notas de la base de datos')
})

module.exports = router