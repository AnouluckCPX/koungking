import { myAPI } from "./api.jsx";

export const loadDataPreOrder = async ({ filter, page, limit, token }) => {
    try {
        const response = await myAPI.post('order', {
            status: filter,
            page: page,
            limit: limit
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

        if (response.status === 200) {
            if (response?.data?.resultCode === 200) {
                return {
                    data: response?.data?.data,
                    total: response?.data?.total,
                }
            }
        } else {
            if (response?.data?.resultCode === 210) {
                return {
                    data: [],
                    total: 10,
                }
            }
        }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

export const loadDataPreOrderByID = async ({ id, token }) => {
    try {
        const response = await myAPI.post('select_one_order', {
            o_id: id
        }, {
            headers: {
                'Authorization': `Bearer ${token?.token}`
            },
        });

        if (response.status === 200) {
            // if (response.data.resultCode === 200) {
            // }
            return {
                data: response?.data,
            }
        }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

export const postCreatePreOrder = async ({ senddata, token }) => {
    try {
        const response = await myAPI.post('create_order', senddata, {
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

export const postCheckOrderSuccess = async ({ senddata, token }) => {
    try {
        const response = await myAPI.post('check_order', senddata, {
            headers: {
                'Authorization': `Bearer ${token?.token}`
            },
        })
        if (response.status === 200) return { data: response?.data }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

export const postPackingPreOrder = async ({ senddata, token }) => {
    try {
        const response = await myAPI.post('car_order', senddata, {
            headers: {
                'Authorization': `Bearer ${token?.token}`
            },
        })
        console.log(response);
        if (response.status === 200) return { data: response }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

export const postCloseOrder = async ({ senddata, token }) => {
    try {
        const response = await myAPI.post('success_order', senddata, {
            headers: {
                'Authorization': `Bearer ${token?.token}`
            },
        })
        console.log(response);
        if (response.status === 200) return { data: response }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

export const postCancelOrder = async ({ senddata, token }) => {
    try {
        const response = await myAPI.post('order_cancel', senddata, {
            headers: {
                'Authorization': `Bearer ${token?.token}`
            },
        })
        console.log(response);
        if (response.status === 200) return { data: response }
        if (response.status === 299) return { data: response }

    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

export const quertPreOrderByCar = async ({ filter, page, limit, token }) => {
    try {
        const response = await myAPI.post('order_car', {
            status: filter,
            page: page,
            limit: limit
        }, {
            headers: {
                'Authorization': `Bearer ${token?.token}`
            },
        })

        if (response.status === 200) {
            if (response?.data?.resultCode === 200) {
                return {
                    data: response?.data?.data,
                    total: response?.data?.total,
                }
            }
        } else {
            if (response?.data?.resultCode === 210) {
                return {
                    data: [],
                    total: 10,
                }
            }
        }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}
