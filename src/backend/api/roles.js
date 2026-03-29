import { axios } from ".";

export const getAllRoles = async () => {
    const { data }  = await axios.get('roles');
    return data;
};