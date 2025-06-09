import serverUrl from "./serverurl";
import commonApi from "./commanApi";

//  login admin
export const loginAdminApi= async(reqBody)=>{
    return await commonApi("POST",`${serverUrl}/login`,reqBody)
}

// add product
export const addProductApi = async (reqBody,reqHeader) => {
    return await commonApi("POST", `${serverUrl}/addproduct`, reqBody,reqHeader);
};

// get all products
export const getAllProductsApi = async () => {
    return await commonApi("GET", `${serverUrl}/getallproducts`, {});
};

// edit product
export const editProductApi = async (id,reqBody, reqHeader) => {
    return await commonApi("PUT", `${serverUrl}/editproduct/${id}`, reqBody, reqHeader);
};

// delete product
export const deleteProductApi = async(id)=>{
    return await commonApi("DELETE",`${serverUrl}/deleteproduct`,{id})
}

// get printed products
export const getPrintedProductsApi = async () => {
    return await commonApi("GET", `${serverUrl}/printed-products`, {});
}

// get solid products
export const getSolidProductsApi = async () => {
    return await commonApi("GET", `${serverUrl}/solid-products`, {});
}

// get product by id
export const getProductByIdApi = async (id) => {
    return await commonApi("GET", `${serverUrl}/product-detail/${id}`, {});
}

// add category
export const addCategoryApi = async (reqBody, reqHeader) => {
    return await commonApi("POST", `${serverUrl}/addcategory`, reqBody, reqHeader);
};

// get all category
export const getAllCategoryApi = async () => {
    return await commonApi("GET", `${serverUrl}/getallcategories`, {});
};

// edit category
export const editCategoryApi = async (id,reqBody,reqHeader) => {
    return await commonApi("PUT", `${serverUrl}/editcategory/${id}`, reqBody,reqHeader);
};

// delete category
export const deleteCategoryApi = async (id) => {
  return await commonApi("DELETE", `${serverUrl}/deletecategory?id=${id}`);
};
