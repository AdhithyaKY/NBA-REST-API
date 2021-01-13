const express = require('express')
const router = express.Router()
const Player = require('../models/player')
//get all
router.get('/', async (req, res) => {
    try {
        const players = await Player.find()
        res.json(players)
    } catch(error) {
        res.status(500).json({ message: error.message})
    }
})
//get one
router.get('/:id', getPlayer, (req, res) => {
    res.send(res.player)
})
//create one
router.post('/', async (req, res) => {
    const player = new Player({
        name: req.body.name,
        height: req.body.height,
        weight: req.body.weight,
        position: req.body.position,
        team: req.body.team
    })
    try{
        const newPlayer = await player.save()
        res.status(201).json(newPlayer)
    } catch(error) {
        res.status(400).json({ message: error.message})
    }
})
//update one
router.patch('/:id', getPlayer, async (req, res) => {
    if (req.body.name != null){
        res.player.name = req.body.name
    }
    if (req.body.heightInches != null){
        res.player.height = req.body.height
    }
    if (req.body.weight != null){
        res.player.weight = req.body.weight
    }
    if (req.body.position != null){
        res.player.position = req.body.position
    }
    if (req.body.team != null){
        res.player.team = req.body.team
    }

    try {
        const updatedPlayer = await res.player.save()
        res.json(updatedPlayer)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//delete one 
router.delete('/:id', getPlayer, async (req, res) => {
    try{
        await res.player.remove()
        res.json({ message: 'Deleted Player' })
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

async function getPlayer(req, res, next){
    let player
    try {
        player = await Player.findById(req.params.id)
        if(player == null){
            return res.status(404).json({ message: 'Cannot find player'})
        }
    } catch(error) {
        return res.status(500).json({ message: error.message})
    }
    res.player = player
    next()
     
}

module.exports = router