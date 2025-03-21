import { IUser } from './user.interface';
import { User } from './user.model';

const getUserProfile = async () => {
  const result = await User.find();
  return result;
};

const getSingleById = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const updateProfilerUser = async (id: string, data: IUser) => {
  const result = await User.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const userService = {
  getUserProfile,
  getSingleById,
  updateProfilerUser,
  deleteUser,
};
