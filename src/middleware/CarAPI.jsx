import { myAPI } from "./api.jsx";

export const queryDataCar = async ({ token }) => {
    try {
        const response = await myAPI.get('car', {
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
        // Handle errors
        console.error(error);
        throw error;  // Re-throw the error for the calling component to handle
    }
}
