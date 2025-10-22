export const getSession = () => sessionStorage.getItem("sp_session") || "";

export const setHasHistory = () =>
    sessionStorage.setItem("has_history", "true");

export const getHasHistory = () =>
    sessionStorage.getItem("has_history") || "false";
