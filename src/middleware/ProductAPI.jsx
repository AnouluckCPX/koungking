import { myAPI } from "./api.jsx";

const mm = JSON.parse(localStorage.getItem('@koungStock'))

export const loadDataProduct = async ({ page, limit, token }) => {
    try {
        const response = await myAPI.post('product', { page, limit }, { headers: { 'Authorization': `Bearer ${token?.token}` } });
        return response.data;
    } catch (error) {
        throw new Error('Failed to load products:', error);
    }
};

export const postCreateProduct = async ({ senddata, token }) => {
    try {
        const response = await myAPI.post('add_product', senddata, {
            headers: {
                'Authorization': `Bearer ${token?.token}`
            },
        })
        if (response.status === 200) return { data: response?.data }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

const putUpdateProduct = async ({ senddata, token }) => {
    // console.log(senddata);
    // console.log(token?.token);
    try {
        const response = await myAPI.put('product', senddata, {
            headers: {
                'Authorization': `Bearer ${token?.token}`
            },
        })
        if (response.status === 200) {
            return { data: response?.data }
        } else { return { data: response?.data } }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

export const postDeleteProduct = async ({ senddata, token }) => {
    try {
        const response = await myAPI.post('dl_product', senddata, {
            headers: {
                'Authorization': `Bearer ${token?.token}`
            },
        })
        if (response.status === 200) { return { data: response } }
        else { return { data: response } }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

export { putUpdateProduct }