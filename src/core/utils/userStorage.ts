export interface UserInfo {
    token: string;
    token_account: string;
    fullname_contacts: string;
    fullname: string;
    userid: string;
    profile_image: string | null;
    login: boolean;
    isSuccess: boolean;
}

export const userStorage = {
    // Lưu thông tin người dùng vào localStorage
    setUserInfo: (userInfo: UserInfo) => {
        if (typeof window !== "undefined") {
            localStorage.setItem('user_info', JSON.stringify(userInfo));
            // localStorage.setItem('token', userInfo.token);
            localStorage.setItem('token_account', userInfo.token_account);
            
            // Dispatch custom event để notify các component khác
            window.dispatchEvent(new CustomEvent('userInfoUpdated'));
        }
    },

    // Lấy thông tin người dùng từ localStorage
    getUserInfo: (): UserInfo | null => {
        if (typeof window !== "undefined") {
            const userInfoStr = localStorage.getItem('user_info');
            if (userInfoStr) {
                try {
                    return JSON.parse(userInfoStr);
                } catch (error) {
                    console.error("Error parsing user info:", error);
                    return null;
                }
            }
        }
        return null;
    },

    // Lấy token từ localStorage
    getToken: (): string | null => {
        if (typeof window !== "undefined") {
            return localStorage.getItem('token');
        }
        return null;
    },

    // Lấy token_account từ localStorage
    getTokenAccount: (): string | null => {
        if (typeof window !== "undefined") {
            return localStorage.getItem('token_account');
        }
        return null;
    },

    // Xóa thông tin người dùng khỏi localStorage
    clearUserInfo: () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem('user_info');
            // localStorage.removeItem('token');
            localStorage.removeItem('token_account');
            
            // Dispatch custom event để notify các component khác
            window.dispatchEvent(new CustomEvent('userInfoUpdated'));
        }
    },

    // Kiểm tra xem người dùng đã đăng nhập chưa
    isLoggedIn: (): boolean => {
        const userInfo = userStorage.getUserInfo();
        return userInfo !== null && userInfo.login === true && userInfo.isSuccess === true;
    }
};
