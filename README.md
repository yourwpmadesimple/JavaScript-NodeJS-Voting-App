![JavaScript NodeJS Voting App](./server/images/1_noM8i-3j8chg6k6URtEjsA.jpg)

# JavaScript NodeJS Voting App
#### Tools
- CSS
- JavaScript
- NodeJS

#### Packages
- Express

## 1. Initialize package.json
```
npm init -y
```
## 2. Install Express Dependency
```
npm i express
```

## 3. Build Server
```JavaScript
const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const dataFile = path.join(__dirname, "data.json")

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Server is running on port 3000")
})
```

## 4. Build data.json File
```json
{
    "JavaScript": 0,
    "TypeScript": 0,
    "Both": 0
}
```

## 5. Support Posting Form Data with URL encoded
```JavaScript
app.use(express.urlencoded({ extended: true}))
```

## 6. Create Route
```JavaScript
const express = require('express')
const fs = require('fs').promises
const path = require('path')
const router = express.Router()

const dataFile = path.join(__dirname, "../data.json")

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

router.post("")

module.exports = router
```

## 7. Creatte Client Side Directory
> directory structure
- client
  - css
  -- style.css
  - js
  -- main.js




