import { useSearchProductSuggestion } from "@/services/chatbot";
import { useMemo, useState } from "react";
import useDebounce from "./useDebounce";

type UseInlineSuggestionOptions = {
    debounceMs?: number;
    field?: "code" | "name";
};

export function useInlineSuggestion(
    inputValue: string,
    setInputValue: (value: string) => void,
    options?: UseInlineSuggestionOptions
) {
    const [isSuggesting, setIsSuggesting] = useState(false);

    const { debounceMs = 200, field = "code" } = options || {};

    const lastToken = useMemo(() => {
        const parts = (inputValue || "").split(",");
        return (parts[parts.length - 1] || "").trim();
    }, [inputValue]);

    const debouncedToken = useDebounce(lastToken, debounceMs);

    const { data: suggestion } = useSearchProductSuggestion(
        debouncedToken,
        Boolean(debouncedToken)
    );

    const suggestText = useMemo(() => {
        if (!suggestion) return "";
        const value = (suggestion as any)?.[field] as string | undefined;
        return value || "";
    }, [suggestion, field]);

    const acceptSuggestion = () => {
        if (!suggestText || isSuggesting) return;
        setIsSuggesting(true);
        const idx = inputValue.lastIndexOf(",");
        if (idx >= 0) {
            const before = inputValue.slice(0, idx + 1).replace(/\s*$/, " ");
            setInputValue(before + suggestText + ", ");
        } else {
            setInputValue(suggestText + ", ");
        }
        setTimeout(() => {
            setIsSuggesting(false);
        }, 100);
    };

    return { suggestText, lastToken, acceptSuggestion };
}

export default useInlineSuggestion;
