import { Category, IProduct } from './product.interface';
import { ProductModel } from './product.model';

// crate a Product
const createProductDB = async (product: IProduct<Category>) => {
  const result = await ProductModel.create(product);
  return result;
};

// get all Product
const getAllBooksDB = async (searchTerm: string | undefined) => {
  if (searchTerm) {
    const result = await ProductModel.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { author: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ],
    });
    return result;
  }
  const result = await ProductModel.find();
  return result;
};


const getSingleBookDB = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

// update a Product

const updateBookDB = async (
  id: string,
  updateData: Partial<IProduct<Category>>,
) => {
  try {
    const result = await ProductModel.findByIdAndUpdate(id.trim(), updateData, {
      new: true,
    });
    return result;
  } catch {
    throw new Error('Invalid product ID.');
  }
};

// delete a Product
const deletBookDB = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

export const ProductService = {
  createProductDB,
  getAllBooksDB,
  getSingleBookDB,
  updateBookDB,
  deletBookDB,
};
