// Request/response types for robot

import { OrderDetail } from "../order/type";

export interface CategoryOption {
    id: string;
    category: string;
}
export interface RobotOption {
    id: string;
    id_robot_support: string;
    name: string;
    level: string;
    link: string | null;
    content: string;
    file: string | null;
    type_send: string;
    event_show: string;
    event_app: string | null;
    show_move_event: string | null;
    next?: string;
    disabled?: boolean;
    is_login: 0 | 1; // 0 -> không cần đăng nhập, 1 -> cần đăng nhập
}

export interface AddressOption {
    id: string;
    client: string;
    address: string;
    factory_code: string;
    factory_name: string;
    phone: string;
    name: string;
    number: string;
    street_name: string;
    ward_name: string;
    district_name: string;
    address_primary: string;
}

export interface OptionLandscapeAndVertical {
    id: string;
    name: string;
}

export interface RobotData {
    id_robot_support: string;
    id_robot_support_detail: string;
    id_client: string;
    session: string;
    session_chat: number;
    is_read: number;
    data_post: any;
    type_send: "0" | "1"; // 0 -> nhân viên, 1 -> khách
    message: string; // nội dung tin nhắn show ra
    event:
        | "select"
        | "text"
        | "options"
        | "start"
        | "evaluate_support"
        | "wait_reply"
        | "show_create_orders"
        | "show_detail_orders"
        | "cancel_product"
        | "select_address_ship"
        | "landscape_and_vertical"; // select -> option , text
    file: string | null; // file đính kèm (hình ảnh)
    suport_items: number;
    json_item: any | null;
    show_move_event: string | null;
    is_function: string;
    id: number;
    event_app: string | null;
    event_show: string;
    options: RobotOption[];
    session_robot: string;
    data_orders?: OrderDetail;
    options_category?: CategoryOption[];

    options_address_ship?: AddressOption[];
    info_address_delivery: AddressOption;

    options_landscape_and_vertical?: OptionLandscapeAndVertical[];
}

export interface GetActiveRobotDetailResponse {
    result: boolean;
    data: RobotData;
    next: boolean | string;
    is_chat: 1 | 2 | null; // 1 -> bat luon , 2 -> bat 1 lan , null -> khong bat
    send_chat: 1; // 1-> dừng lại nhập mã sản phẩm
    next_wait?: string;
}

export interface ActiveRobotDetailPayload {
    option_id: number;
    sp_session?: string;
}
