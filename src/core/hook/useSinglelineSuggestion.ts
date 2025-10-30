import { useSearchProductSuggestion } from "@/services/chatbot";
import useDebounce from "./useDebounce";
import { useMemo } from "react";

export type UseSinglelineSuggestionOptions = {
    debounceMs?: number;
    field?: "code" | "name";
};

export function useSinglelineSuggestion(
    inputValue: string,
    setInputValue?: (val: string) => void,
    options?: UseSinglelineSuggestionOptions
) {
    const { debounceMs = 200, field = "code" } = options || {};
    const debounced = useDebounce(inputValue, debounceMs);

    const { data: suggestion } = useSearchProductSuggestion(
        debounced,
        Boolean(debounced)
    );

    const suggestText = useMemo(() => {
        if (!suggestion) return "";
        const value = (suggestion as any)?.[field] as string | undefined;
        return value || "";
    }, [suggestion, field]);

    const acceptSuggestion = () => {
        if (!setInputValue || !suggestText) return;
        setInputValue(suggestText);
    };

    return { suggestText, acceptSuggestion };
}

export default useSinglelineSuggestion;
