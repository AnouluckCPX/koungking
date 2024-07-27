import { myAPI } from "./api.jsx";

export const queryDataImport = async ({ page, pageSize, token }) => {
    try {
        const response = await myAPI.post('get_import', {
            page: page,
            limit: pageSize
        }, {
            headers: {
                'Authorization': `Bearer ${token?.token}`
            },
        });

        if (response.status === 200) {
            return {
                data: response?.data,
                total: response?.data?.total,
            };
        }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

export const postCreateImport = async ({ senddata, token }) => {
    try {
        const response = await myAPI.post('create_import', senddata, {
            headers: {
                'Authorization': `Bearer ${token?.token}`
            },
        })
        if (response.status === 200) return { data: response };
        else return { data: response };
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
};

export const postQueryImportById = async ({ id, token }) => {
    try {
        const response = await myAPI.post('select_one_import', { im_id: id }, {
            headers: {
                'Authorization': `Bearer ${token?.token}`
            },
        })
        // console.log(response?.data);
        if (response.status === 200) return { data: response?.data };
        else return { data: response?.data };
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
};