const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const projects = [
  {
    title: "Chepsbook",
    image: "/img/chepsbook.png",
    link: "https://cheps-s.github.io/Chepsbook.com"
  },
  {
    title: "Andrei Portfolio",
    image: "/img/portfolio.png",
    link: "https://cheps-s.github.io/Andreinyl.com"
  }
]

app.get("/api/projects", (req, res) => {
  res.json(projects)
})

app.listen(5000, () => {
  console.log("Server running on port 5000")
})
