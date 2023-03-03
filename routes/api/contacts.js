const express = require("express");

const {
  contacts: ctrl,
} = require("../../controllers/index");
const {
  addContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} = require("../validation/index");
const {
  validateBody,
  auth,
} = require("../../middlewares/index");

const router = express.Router();

router.get("/", auth, ctrl.getAllContacts);

router.get(
  "/:contactId",
  auth,
  ctrl.getOneContact
);

router.post(
  "/",
  auth,
  validateBody(addContactSchema),
  ctrl.addContact
);

router.put(
  "/:contactId",
  auth,
  validateBody(updateContactSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  auth,
  validateBody(updateFavoriteSchema),
  ctrl.updContactStatus
);

router.delete(
  "/:contactId",
  auth,
  ctrl.removeContact
);

module.exports = router;
