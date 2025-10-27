// /**
//  * Ví dụ sử dụng LoginModal và useLoginModal
//  * 
//  * Có 3 cách chính để sử dụng modal đăng nhập:
//  */

// // CÁCH 1: Sử dụng LoginButton (đã tích hợp sẵn modal)
// import { LoginButton } from "@/modules/auth";

// const Example1 = () => {
//     const handleLoginSuccess = async (credentials) => {
//         console.log("Đăng nhập thành công:", credentials);
//         // Xử lý logic đăng nhập ở đây
//     };

//     const handleLoginError = (error) => {
//         console.error("Lỗi đăng nhập:", error);
//         // Xử lý lỗi đăng nhập ở đây
//     };

//     return (
//         <div>
//             {/* Sử dụng LoginButton với callback tùy chỉnh */}
//             <LoginButton 
//                 onLoginSuccess={handleLoginSuccess}
//                 onLoginError={handleLoginError}
//             >
//                 Đăng nhập ngay
//             </LoginButton>

//             {/* Hoặc sử dụng LoginButton với onClick tùy chỉnh */}
//             <LoginButton onClick={() => console.log("Custom click")}>
//                 Custom Action
//             </LoginButton>
//         </div>
//     );
// };

// // CÁCH 2: Sử dụng useLoginModal hook với LoginModal component
// import { useLoginModal } from "@/core/hook";
// import { LoginModal } from "@/modules/auth";

// const Example2 = () => {
//     const { isOpen, openModal, closeModal, handleLogin } = useLoginModal({
//         onLoginSuccess: async (credentials) => {
//             console.log("Đăng nhập thành công:", credentials);
//             // Xử lý logic đăng nhập
//         },
//         onLoginError: (error) => {
//             console.error("Lỗi đăng nhập:", error);
//             // Xử lý lỗi
//         }
//     });

//     return (
//         <div>
//             {/* Button tùy chỉnh để mở modal */}
//             <button 
//                 onClick={openModal}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//                 Mở Modal Đăng Nhập
//             </button>

//             {/* Modal đăng nhập */}
//             <LoginModal
//                 isOpen={isOpen}
//                 onClose={closeModal}
//                 onLogin={handleLogin}
//             />
//         </div>
//     );
// };

// // CÁCH 3: Sử dụng LoginModal trực tiếp với state management tùy chỉnh
// import { useState } from "react";
// import { LoginModal, LoginCredentials } from "@/modules/auth";

// const Example3 = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const handleLogin = async (credentials: LoginCredentials) => {
//         try {
//             console.log("Đăng nhập với:", credentials);
//             // Xử lý logic đăng nhập
//             setIsModalOpen(false); // Đóng modal sau khi đăng nhập thành công
//         } catch (error) {
//             console.error("Lỗi đăng nhập:", error);
//             // Xử lý lỗi
//         }
//     };

//     return (
//         <div>
//             <button 
//                 onClick={() => setIsModalOpen(true)}
//                 className="bg-green-500 text-white px-4 py-2 rounded"
//             >
//                 Đăng nhập
//             </button>

//             <LoginModal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 onLogin={handleLogin}
//             />
//         </div>
//     );
// };

// export { Example1, Example2, Example3 };
