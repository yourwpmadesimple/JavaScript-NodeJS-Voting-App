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
  -- main.css
  - js
  -- main.js
## 8. Build out styles in main.css
```css
.poll {
  width: 400px;
  padding: 1.5rem;
  margin: 50px;
  font-family: sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
}

.poll__title{
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
}

.poll__option-fill{
    width: 50%;
    height: 10px;
    background-color: #ddd;
}

.poll__option:hover{
    cursor: pointer;
}

.poll__option:not(:last-child){
    margin-bottom: 0.5rem;
}


.poll__option--selected .poll__option-fill{
    background-color: #009578;
}
.poll__option--selected .poll__option-info{
    font-weight: bold;
}
.poll__option-info{
    display: flex;
    justify-content: space-between;
    padding:0.5rem 0;
    font-size: 0.85rem;
}
```

## 9. Inject HTML
```JavaScript
class Poll {
    constructor(root, title) {
        this.root = root
        this.selected = sessionStorage.getItem('poll-selected')
        this.endpoint = "http://localhost:3000/poll"

        this.root.insertAdjacentHTML('afterbegin', `
        <div class="poll__title">${ title }</div>
        `)

        this._refresh()
    }

    async _refresh() {
        const response = await fetch(this.endpoint)
        const data = await response.json()

        console.log(data)
    }
}

const p = new Poll(document.querySelector('.poll'), "Which do you prefer?")
console.log(p)
```

## 10. Enable CORS
> directory server > routes > Router.js
```JavaScript
// Enable CORS Middleware
router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")

    next()
})
```