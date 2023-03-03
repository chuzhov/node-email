const { Schema, model } = require("mongoose");
const gravatar = require("gravatar");

//in this case, getting 'admin' role is possible only manually by mongoDB admin
const usersRoles = ["customer", "admin"];

const USER_SUBSCRIPTION_TYPES = [
  "starter",
  "pro",
  "business",
];
const defSubscriptionPlanIdx = 0;

const USER_AVATAR_PARAMS = {
  dimensions: {
    width: 250,
    height: 250,
  },
  maxFileSize: 100000,
  acceptableFileTypes: [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
  ],
};

const userSchema = Schema(
  {
    name: {
      type: String,
      required: false,
      default: function () {
        return this.email;
      },
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatarURL: {
      type: String,
      required: true,
      default: function () {
        return gravatar.url(this.email, {
          s: USER_AVATAR_PARAMS.dimensions.width.toString(),
        });
      },
    },
    isEmailConfirmed: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: usersRoles,
      default: usersRoles[defSubscriptionPlanIdx], //to get admin role you schould edit this field manually
      validate: {
        validator: function (value) {
          value === "admin" ? false : true;
        },
        message: (props) =>
          `${props.value} could not be assigned this way`,
      },
    },
    subscription: {
      type: String,
      enum: USER_SUBSCRIPTION_TYPES,
      default:
        USER_SUBSCRIPTION_TYPES[
          defSubscriptionPlanIdx
        ],
    },
    token: String,
  },
  { timestamps: true }
);

//this is example how to create custom validator for the whole Schema:
userSchema.methods.validateSchema = function () {
  const errors = this.validateSync();
  if (errors) {
    throw new Error(errors.message);
  }
};

const User = model("user", userSchema);

module.exports = {
  User,
  USER_SUBSCRIPTION_TYPES,
  USER_AVATAR_PARAMS,
};
