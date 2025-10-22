import { cn } from "@/core/utils/cn";

type HtmlRendererProps = {
    htmlContent: string;
    className?: string;
};

const HtmlRenderer = ({ htmlContent, className }: HtmlRendererProps) => {
    // Config để xử lý HTML
    const processHtmlContent = (html: string) => {
        // Decode HTML entities
        const decodedHtml = html
            .replace(/&aacute;/g, "á")
            .replace(/&agrave;/g, "à")
            .replace(/&acirc;/g, "â")
            .replace(/&atilde;/g, "ã")
            .replace(/&auml;/g, "ä")
            .replace(/&eacute;/g, "é")
            .replace(/&egrave;/g, "è")
            .replace(/&ecirc;/g, "ê")
            .replace(/&euml;/g, "ë")
            .replace(/&iacute;/g, "í")
            .replace(/&igrave;/g, "ì")
            .replace(/&icirc;/g, "î")
            .replace(/&iuml;/g, "ï")
            .replace(/&oacute;/g, "ó")
            .replace(/&ograve;/g, "ò")
            .replace(/&ocirc;/g, "ô")
            .replace(/&otilde;/g, "õ")
            .replace(/&ouml;/g, "ö")
            .replace(/&uacute;/g, "ú")
            .replace(/&ugrave;/g, "ù")
            .replace(/&ucirc;/g, "û")
            .replace(/&uuml;/g, "ü")
            .replace(/&yacute;/g, "ý")
            .replace(/&ygrave;/g, "ỳ")
            .replace(/&ycirc;/g, "ŷ")
            .replace(/&yuml;/g, "ÿ")
            .replace(/&Aacute;/g, "Á")
            .replace(/&Agrave;/g, "À")
            .replace(/&Acirc;/g, "Â")
            .replace(/&Atilde;/g, "Ã")
            .replace(/&Auml;/g, "Ä")
            .replace(/&Eacute;/g, "É")
            .replace(/&Egrave;/g, "È")
            .replace(/&Ecirc;/g, "Ê")
            .replace(/&Euml;/g, "Ë")
            .replace(/&Iacute;/g, "Í")
            .replace(/&Igrave;/g, "Ì")
            .replace(/&Icirc;/g, "Î")
            .replace(/&Iuml;/g, "Ï")
            .replace(/&Oacute;/g, "Ó")
            .replace(/&Ograve;/g, "Ò")
            .replace(/&Ocirc;/g, "Ô")
            .replace(/&Otilde;/g, "Õ")
            .replace(/&Ouml;/g, "Ö")
            .replace(/&Uacute;/g, "Ú")
            .replace(/&Ugrave;/g, "Ù")
            .replace(/&Ucirc;/g, "Û")
            .replace(/&Uuml;/g, "Ü")
            .replace(/&Yacute;/g, "Ý")
            .replace(/&Ygrave;/g, "Ỳ")
            .replace(/&Ycirc;/g, "Ŷ")
            .replace(/&Yuml;/g, "Ÿ")
            .replace(/&nbsp;/g, " ")
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'");

        return decodedHtml;
    };

    // Xử lý HTML content
    const processedHtml = processHtmlContent(htmlContent);

    return (
        <div
            className={cn("text-base font-medium w-full", className)}
            dangerouslySetInnerHTML={{ __html: processedHtml }}
        />
    );
};

export default HtmlRenderer;
