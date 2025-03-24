"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const Header = () => {
    const [currentTime, setCurrentTime] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [fontScale, setFontScale] = useState(1);

    useEffect(() => {
        setCurrentTime(new Date());
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const savedScale = localStorage.getItem("fontScale");
        if (savedScale) {
            setFontScale(parseFloat(savedScale));
        }
    }, []);

    useEffect(() => {
        document.documentElement.style.fontSize = `${fontScale * 100}%`;
        localStorage.setItem("fontScale", fontScale.toString());
    }, [fontScale]);

    useEffect(() => {
        const scriptId = "google-translate-script";
        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateInit";
            script.async = true;
            document.body.appendChild(script);
        }

        window.googleTranslateInit = () => {
            if (window.google) {
                new window.google.translate.TranslateElement(
                    { pageLanguage: "en", includedLanguages: "en,kn,hi,mr,ta", autoDisplay: false },
                    "google_translate_element"
                );
            }
        };
    }, []);

    const changeLanguage = (lang) => {
        const select = document.querySelector(".goog-te-combo");
        if (select) {
            select.value = lang;
            select.dispatchEvent(new Event("change"));
        }
    };

    const increaseFont = () => setFontScale((prev) => Math.min(prev + 0.1, 1.5));
    const decreaseFont = () => setFontScale((prev) => Math.max(prev - 0.1, 0.8));
    const resetFont = () => setFontScale(1);

    const formatDateTime = (date) => {
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${day} ${month}, ${year} | ${hours}:${minutes}:${seconds} ${ampm}`;
    };

    return (
        <div className="w-full bg-[rgb(23,0,108)] text-white font-semibold text-sm shadow-lg sticky top-0 z-50">
            <div className="flex items-center justify-between px-4 py-2 md:hidden">
                <div>{currentTime ? formatDateTime(currentTime) : "Loading..."}</div>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} aria-label="Toggle Dropdown" className="focus:outline-none">
                    <ChevronDown size={24} />
                </button>
            </div>

            <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out md:hidden bg-[rgb(23,0,108)] text-white px-4 ${isDropdownOpen ? "max-h-40" : "max-h-0"}`}>
                <div className="py-2">
                    <div className="flex items-center gap-2">
                        <a href="/" className="text-white no-underline">⛓️ TraceX</a>
                        <span>|</span>
                        <div>
                            <button onClick={decreaseFont} className="m-1 text-xs bg-gray-200 text-black px-2 py-1 rounded-md">-A</button>
                            <button onClick={resetFont} className="m-1 text-xs bg-gray-200 text-black px-2 py-1 rounded-md">A</button>
                            <button onClick={increaseFont} className="m-1 text-xs bg-gray-200 text-black px-2 py-1 rounded-md">+A</button>
                        </div>
                        <span>|</span>
                        <select className="text-black bg-white border border-gray-300 p-1 text-xs" onChange={(e) => changeLanguage(e.target.value)}>
                            <option value="en">English</option>
                            <option value="kn">Kannada</option>
                            <option value="hi">Hindi</option>
                            <option value="mr">Marathi</option>
                            <option value="ta">Tamil</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex items-center justify-between px-4 py-2">
                <div>{currentTime ? formatDateTime(currentTime) : "Loading..."}</div>
                <div className="flex items-center gap-2">
                    <a href="/" className="text-white no-underline">⛓️ TraceX</a>
                    <span>|</span>
                    <div>
                        <button onClick={decreaseFont} className="m-1 text-xs bg-gray-200 text-black px-2 py-1 rounded-md">-A</button>
                        <button onClick={resetFont} className="m-1 text-xs bg-gray-200 text-black px-2 py-1 rounded-md">A</button>
                        <button onClick={increaseFont} className="m-1 text-xs bg-gray-200 text-black px-2 py-1 rounded-md">+A</button>
                    </div>
                    <span>|</span>
                    <select className="text-black bg-white border border-gray-300 p-1 text-xs" onChange={(e) => changeLanguage(e.target.value)}>
                        <option value="en">English</option>
                        <option value="kn">Kannada</option>
                        <option value="hi">Hindi</option>
                        <option value="mr">Marathi</option>
                        <option value="ta">Tamil</option>
                    </select>
                </div>
            </div>

            <div id="google_translate_element" className="hidden"></div>
        </div>
    );
};

export default Header;
