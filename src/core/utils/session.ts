export const getSession = () => sessionStorage.getItem("sp_session") || "";

export const setSession = (session: string) =>
    sessionStorage.setItem("sp_session", session);

export const removeSession = () => sessionStorage.removeItem("sp_session");

export const setHasHistory = () =>
    sessionStorage.setItem("has_history", "true");

export const getHasHistory = () =>
    sessionStorage.getItem("has_history") || "false";
