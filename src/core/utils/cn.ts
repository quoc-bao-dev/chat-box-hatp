type ClassDictionary = Record<string, unknown>;
type ClassArray = Array<ClassValue>;
type ClassPrimitive = string | number | null | undefined | false | true;
export type ClassValue = ClassPrimitive | ClassDictionary | ClassArray;

function toClassString(input: ClassValue): string {
    if (!input) return "";
    if (typeof input === "string" || typeof input === "number") {
        return String(input);
    }
    if (Array.isArray(input)) {
        const nested = input.map(toClassString).filter(Boolean).join(" ");
        return nested;
    }
    if (typeof input === "object") {
        const fromObject = Object.entries(input)
            .filter(([, enabled]) => Boolean(enabled))
            .map(([key]) => key)
            .join(" ");
        return fromObject;
    }
    return "";
}

export const cn = (...inputs: ClassValue[]): string => {
    const classes = inputs.map(toClassString).filter(Boolean).join(" ");
    return classes.replace(/\s+/g, " ").trim();
};
