import { UserModel } from "./userSchema";

// Get all users
export const getUsers = async () => {
  try {
    return await UserModel.find().lean();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Get user by ID
export const getUserById = async (id: string) => {
  try {
    return await UserModel.findById(id).select("+authentication.password +authentication.salt");
  } catch (error) {
    console.error("Error finding user by ID:", error);
    throw error;
  }
};

// Get user by email
export const getUserByEmail = async (email: string) => {
  try {
    return UserModel.findOne({ email }).select("+authentication.password +authentication.salt");
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
};

// Get user by session-token
export const getUserBySessionToken = async (sessionToken: string) => {
  try {
    return await UserModel.findOne({ "authentication.sessionToken": sessionToken });
  } catch (error) {
    console.error("Error finding user by session token:", error);
    throw error;
  }
};

// Create a new user
export const createUser = async (values: Record<string, any>) => {
  try {
    const user = new UserModel(values);
    await user.validate(); // Validate before saving
    return await user.save();
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Update user by id
export const updateUserById = async (id: string, updates: Record<string, any>) => {
  try {
    return await UserModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true, // Run model validations on update
    });
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Delete user by id
export const deleteUserById = async (id: string) => {
  try {
    return await UserModel.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
