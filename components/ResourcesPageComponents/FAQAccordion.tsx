"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { JsonLd, getFaqSchema } from "@/components/SchemaMarkup";

// Portable text can be an array of block objects or a plain string (legacy)
type PortableTextBlock = Record<string, unknown>;

interface FAQItem {
    id?: number | string;
    _key?: string;
    question: string;
    answer: string | PortableTextBlock[];
}

interface FAQAccordionProps {
    items: FAQItem[];
}

const portableTextComponents: PortableTextComponents = {
    marks: {
        link: ({ children, value }) => {
            const href: string = value?.href ?? "";
            const isExternal = value?.blank === true || (href.startsWith("http") && !href.includes("drshreyankeducare.com"));
            return (
                <a
                    href={href}
                    target={isExternal ? "_blank" : "_self"}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="text-primary underline underline-offset-2 hover:opacity-75 transition-opacity"
                >
                    {children}
                </a>
            );
        },
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>
        ),
        number: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => <li className="text-slate">{children}</li>,
        number: ({ children }) => <li className="text-slate">{children}</li>,
    },
    block: {
        normal: ({ children }) => (
            <p className="text-[18px] font-montserrat text-slate leading-7 mb-2 last:mb-0">{children}</p>
        ),
    },
};

const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
    const [openIds, setOpenIds] = useState<(number | string)[]>([]);
    const faqSchema = getFaqSchema(items);

    const toggleExpand = (id: number | string) => {
        setOpenIds((currentOpenIds) =>
            currentOpenIds.includes(id)
                ? currentOpenIds.filter((openId) => openId !== id)
                : [...currentOpenIds, id]
        );
    };

    return (
        <>
            {faqSchema && <JsonLd schema={faqSchema} />}
            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
                <div className="flex flex-col gap-10">
                    {items.map((item, index) => {
                        const itemId = item._key || item.id || index;
                        const isOpen = openIds.includes(itemId);
                        const isRichText = Array.isArray(item.answer);

                        return (
                            <div key={String(itemId)} className="border-b-2 border-primary">
                                <button
                                    onClick={() => toggleExpand(itemId)}
                                    className="w-full flex items-start justify-between pt-5 pb-10 px-0 text-left hover:opacity-80 transition-opacity"
                                    aria-expanded={isOpen}
                                >
                                    <h3 className="text-xl font-montserrat font-medium text-primary leading-7">
                                        {item.question}
                                    </h3>
                                    <div className="shrink-0 ml-4">
                                        {isOpen ? (
                                            <Minus className="w-7 cursor-pointer h-7 text-primary font-extrabold" />
                                        ) : (
                                            <Plus className="w-7 h-7 cursor-pointer text-primary font-extrabold" />
                                        )}
                                    </div>
                                </button>

                                {/*
                                 * Always rendered in the DOM so crawlers can index the answer text.
                                 * Visibility is CSS-only: grid-template-rows transitions between
                                 * 0fr (collapsed) and 1fr (expanded). The inner div's min-height:0
                                 * allows the grid row to collapse fully without JS height calc.
                                 */}
                                <div
                                    aria-hidden={!isOpen}
                                    style={{
                                        display: "grid",
                                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                                        transition: "grid-template-rows 250ms ease",
                                    }}
                                >
                                    <div style={{ minHeight: 0, overflow: "hidden" }}>
                                        <div className="pb-5 px-0">
                                            {isRichText ? (
                                                <div className="font-montserrat text-slate leading-7">
                                                    <PortableText
                                                        value={item.answer as PortableTextBlock[]}
                                                        components={portableTextComponents}
                                                    />
                                                </div>
                                            ) : (
                                                <p className="text-[18px] font-montserrat text-slate leading-7 whitespace-pre-wrap">
                                                    {item.answer as string}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default FAQAccordion;
