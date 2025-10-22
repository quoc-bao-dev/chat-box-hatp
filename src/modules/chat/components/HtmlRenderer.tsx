import { cn } from "@/core/utils/cn";
import React from "react";
import { renderToString } from "react-dom/server";

type HtmlRendererProps = {
    htmlContent: string;
    className?: string;
    bulletPointConfig?: {
        enabled?: boolean;
        bulletJSX?: React.ReactNode;
        bulletClassName?: string;
        liSpacing?: string; // Khoảng cách giữa các li items
        ulClassName?: string; // CSS class cho ul
        liClassName?: string; // CSS class cho li
    };
};

const HtmlRenderer = ({
    htmlContent,
    className,
    bulletPointConfig = {
        enabled: true,
        bulletJSX: (
            <div className="w-1 h-1 bg-blue-500 rounded-full mt-2"></div>
        ),
        bulletClassName: " flex items-start justify-center mr-2",
        liSpacing: "0rem", // Khoảng cách mặc định giữa các li
        ulClassName: "",
        liClassName: "-my-2 flex items-start justify-start",
    },
}: HtmlRendererProps) => {
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

    // Render HTML với xử lý đặc biệt cho ul/li
    const renderHtmlWithBullets = (html: string) => {
        const processedHtml = processHtmlContent(html);

        // Nếu không bật bullet points hoặc không có ul/li, render bình thường
        if (
            !bulletPointConfig.enabled ||
            (!processedHtml.includes("<ul>") && !processedHtml.includes("<li>"))
        ) {
            return (
                <div
                    className={cn("text-base font-medium w-full", className)}
                    dangerouslySetInnerHTML={{ __html: processedHtml }}
                />
            );
        }

        // Parse HTML để xử lý ul/li
        const parser = new DOMParser();
        const doc = parser.parseFromString(processedHtml, "text/html");

        // Tìm tất cả ul elements
        const ulElements = doc.querySelectorAll("ul");
        ulElements.forEach((ul) => {
            ul.style.listStyleType = "none";
            ul.style.paddingLeft = "0";
            ul.style.marginLeft = "0";

            // Áp dụng CSS class cho ul nếu có
            if (bulletPointConfig.ulClassName) {
                ul.className = bulletPointConfig.ulClassName;
            }

            // Xử lý từng li element
            const liElements = ul.querySelectorAll("li");
            liElements.forEach((li) => {
                // li.style.display = "flex";
                // li.style.alignItems = "center"; // Thay đổi từ flex-start thành center
                // li.style.marginBottom = bulletPointConfig.liSpacing || "0.5rem";

                // Áp dụng CSS class cho li nếu có
                if (bulletPointConfig.liClassName) {
                    li.className = bulletPointConfig.liClassName;
                }

                // Tạo bullet point element
                const bulletSpan = document.createElement("div");
                bulletSpan.className =
                    bulletPointConfig.bulletClassName ||
                    "text-gray-600 mr-2 flex items-center justify-center";

                // Xử lý bulletJSX - có thể là string hoặc JSX element
                if (typeof bulletPointConfig.bulletJSX === "string") {
                    bulletSpan.textContent = bulletPointConfig.bulletJSX;
                } else if (React.isValidElement(bulletPointConfig.bulletJSX)) {
                    // Convert JSX element to HTML string
                    try {
                        const htmlString = renderToString(
                            bulletPointConfig.bulletJSX
                        );
                        bulletSpan.innerHTML = htmlString;
                    } catch (error) {
                        console.warn("Error rendering bulletJSX:", error);
                        bulletSpan.textContent = "•";
                    }
                } else {
                    bulletSpan.textContent = "•";
                }

                // Tạo wrapper cho nội dung của li và di chuyển toàn bộ nội dung hiện tại vào trong
                const contentWrapper = document.createElement("div");
                const existingNodes = Array.from(li.childNodes);
                li.innerHTML = "";

                existingNodes.forEach((node) => {
                    contentWrapper.appendChild(node);
                });

                // Chèn bullet và content wrapper để li có đúng 2 phần tử con: bullet và nội dung
                li.appendChild(bulletSpan);
                li.appendChild(contentWrapper);
            });
        });

        return (
            <div
                className={cn("text-base font-medium w-full", className)}
                dangerouslySetInnerHTML={{ __html: doc.body.innerHTML }}
            />
        );
    };

    return renderHtmlWithBullets(htmlContent);
};

export default HtmlRenderer;
