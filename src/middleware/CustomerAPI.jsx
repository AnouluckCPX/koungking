import { myAPI } from "./api.jsx"

const loadDataCustomer = async ({ token }) => {
    try {
        const response = await myAPI.get('customer', {
            headers: {
                'Authorization': `Bearer ${token?.token}`
            },
        });

        if (response.status === 200) {
            if (response.data.resultCode === 200) {
                return {
                    data: response?.data,
                }
            }
        }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

export { loadDataCustomer };