const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users', async (req, res) =>{
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send({ user, Message: 'User Created'})
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/users', async (req, res) => {
    try {
        const user = await User.find({})
        if (!user) {
            res.status(404).send('No user found')
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            res.status(404).send('User does not exist')
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'mobile', 'password']
    const isValid = updates.every((updates) => allowedUpdates.includes(updates))

    if (!isValid) {
        return res.status(400).send({ error: 'Invalid Update fields'})
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        // const user = await User.findById(req.params.id)

        // updates.forEach((update) => user[update] = req.body[update])

        await user.save()
        res.send({ user, Message: 'User Updated Successfully'})
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            res.status(404).send({Error: 'This user does not exist'})
        }
        res.send({ Message: 'User removed Successfully'})
    } catch (e) {
        res.send()
    }
})

module.exports = router
