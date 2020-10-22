const { Router } = require("express")

const data = require("../controller.js")
const router = Router()
router
    .route("/")

        .get(data.get)
        .post(data.post)

router
    .route("/:id")
        .delete(data.delete)
        .put(data.put)

module.exports = router  