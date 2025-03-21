import { Request, Response } from 'express';
import { ProductService } from './product.service';
import catchAsync from '../../Utils/catchAsync';
import sendResponse from '../../Utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createProduct = catchAsync(async (req: Request, res: Response): Promise<void> => {

  const  productdata  = req.body;

  const result = await ProductService.createProductDB(productdata);

  sendResponse(res, {
    message: 'Book created successfully',
    status: true,
    statusCode: StatusCodes.CREATED,
    data: result,
  })
});


// getAllbooks
const getAllbooks = catchAsync(async (req: Request, res: Response) => {
    const searchTerm = req.query.searchTerm as string | undefined;

    const result = await ProductService.getAllBooksDB(searchTerm);

    sendResponse(res, {
      message: 'Books retrieved successfully',
      status: true,
      statusCode: StatusCodes.OK,
      data: result,
    })
});

// get special book id
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
 
  const { productId } = req.params;

  const result = await ProductService.getSingleBookDB(productId);

  sendResponse(res ,{
    message: 'Book retrieved successfully',
    status: true,
    statusCode: StatusCodes.OK,
    data: result,
  })
});

// update book

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.productId.trim();
  const body = req.body;
  const result = await ProductService.updateBookDB(productId, body);

  sendResponse(res, {
    message: 'Book updated successfully',
    status: true,
    statusCode: StatusCodes.OK,
    data: result,
  })
});

// delete book
const deleteBook = catchAsync(async (req: Request, res: Response) => {
 
  const productId = req.params.productId;
  const result = await ProductService.deletBookDB(productId);

  sendResponse(res, {
    message: 'Book deleted successfully',
    status: true,
    statusCode: StatusCodes.OK,
    data: result,
  })
});

export const ProductController = {
  createProduct,
  getAllbooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
