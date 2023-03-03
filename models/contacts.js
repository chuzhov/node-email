const { Schema, model } = require("mongoose");

const contactSchema = Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      required: [
        true,
        "Name property is required",
      ],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
