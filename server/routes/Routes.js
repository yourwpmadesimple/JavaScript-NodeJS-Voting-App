const express = require('express')
const fs = require('fs').promises
const path = require('path')
const router = express.Router()

const dataFile = path.join(__dirname, "../data.json")
router.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
    res.send("Index Route")
})

router.get('/poll', async(req, res) => {
    // Return content from JSON data file
    let data = JSON.parse(await fs.readFile(dataFile, "utf-8"))

    // Return the totals from data Object
    const totalVotes = Object.values(data).reduce((total, n) => total += n, 0)

    // Get the percentage for each objects value
    data = Object.entries(data).map(([label, votes]) => {
        return {
            label: label,
            percentage: `${(((100 * votes) / totalVotes) || 0).toFixed(0)}%`
        }
    })

    res.json({ data })
})

router.post('/poll', async(req, res) => {
    const data = JSON.parse(await fs.readFile(dataFile, "utf-8"))

    data[req.body.add]++

        await fs.writeFile(dataFile, JSON.stringify(data))

    res.end()
})
module.exports = router