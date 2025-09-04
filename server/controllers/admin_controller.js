const user = require("../models/user_model");
const contact = require("../models/contact_model");

const GetAllUsers = async (req, res, next) => {  // 👈 next add karo
  try {
    const users = await user.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const GetAllContacts = async (req, res, next) => {  // 👈 next add karo
  try {
    const contacts = await contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};


const deleteUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const deletedUser = await user.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    next(error);  // ✅ ab next defined hai
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedContact = await contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    next(error);
  }
};


const GetUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const data = await user.findOne({ _id: id }, { password: 0 });

    res.status(200).json(data);

  } catch (error) {
    next(error);
  }
};

const UpdateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;
    const updateData = await user.updateOne({ _id: id }, { $set: updatedUserData });
    return res.status(200).json(updateData);
  } catch (error) {
    next(error);
  }
};


module.exports = { GetAllUsers, GetAllContacts, deleteUserById, GetUserById, UpdateUserById, deleteContact };
