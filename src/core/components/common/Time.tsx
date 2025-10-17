import {
    formatDistanceToNow,
    format,
    isToday,
    isYesterday,
    isThisWeek,
    isThisYear,
    differenceInMinutes,
    differenceInHours,
    differenceInDays,
} from "date-fns";
import { vi } from "date-fns/locale";

interface TimeProps {
    time: Date | string;
    className?: string;
}

const Time = ({ time, className = "" }: TimeProps) => {
    const date = typeof time === "string" ? new Date(time) : time;

    const formatTime = (date: Date): string => {
        const now = new Date();
        const minutesDiff = differenceInMinutes(now, date);
        const hoursDiff = differenceInHours(now, date);
        const daysDiff = differenceInDays(now, date);

        // Less than 1 minute - show "Vừa xong"
        if (minutesDiff < 1) {
            return "Vừa xong";
        }

        // Less than 1 hour - show "X phút trước"
        if (minutesDiff < 60) {
            return `${minutesDiff} phút trước`;
        }

        // Less than 24 hours - show "X giờ trước"
        if (hoursDiff < 24) {
            return `${hoursDiff} giờ trước`;
        }

        // Yesterday - show "Hôm qua, HH:mm"
        if (isYesterday(date)) {
            return `Hôm qua, ${format(date, "HH:mm")}`;
        }

        // This week - show day name and time (e.g., "Thứ 2, 10:30")
        if (isThisWeek(date)) {
            const dayName = format(date, "EEEE", { locale: vi });
            return `${dayName}, ${format(date, "HH:mm")}`;
        }

        // This year - show date and time (e.g., "15/10, 10:30")
        if (isThisYear(date)) {
            return format(date, "dd/MM, HH:mm");
        }

        // Different year - show full date and time (e.g., "15/10/2023, 10:30")
        return format(date, "dd/MM/yyyy, HH:mm");
    };

    return (
        <div className={`text-center text-gray-500 text-sm ${className}`}>
            <p>{formatTime(date)}</p>
        </div>
    );
};

export default Time;
