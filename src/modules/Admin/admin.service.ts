import { IUser } from "../User/user.interface";
import { User } from "../User/user.model";


const getAllAdminFromDB = async ( query: Record<string, unknown>) => {
  const result = await User.find(query);
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const updateAdminFromDB = async (id: string, updateData: Partial<IUser>) => {
  const result = await User.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const adminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateAdminFromDB,
  deleteAdminFromDB,
};