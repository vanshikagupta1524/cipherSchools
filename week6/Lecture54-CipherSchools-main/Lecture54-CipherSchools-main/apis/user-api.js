import LibraryApplicationBackend from "./LibraryApplicationBackend";

export const loginUser = async ({ email, password }) => {
    const { data } = await LibraryApplicationBackend.post("/user/login", { email, password });
    return data;
};

export const signUpUser = async (userData) => {
    const { data } = await LibraryApplicationBackend.post("/user/signup", userData);
    return data;
};