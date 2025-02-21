import { useState } from "react";
import { Info } from "lucide-react";

const boxes = [
    { icon: "voice.png", heading: "Narrate your Problem", number: "125", link: "/threats", info: "Explain your problem using voice narration." },
    { icon: "typing.jpg", heading: "Write your appeal", number: "8", link: "/sessions", info: "Submit your appeal in written form." },
    { icon: "database.png", heading: "Explore Legal provisions", number: "23", link: "/alerts", info: "Browse relevant legal provisions." },
];

export default function FeatureBoxes() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "40px", // Space between boxes
                padding: "80px 40px 40px 40px",
                backgroundColor: "rgb(23, 0, 108)",
                flexWrap: "wrap",
            }}
        >
            {boxes.map((box, index) => (
                <div
                    key={index}
                    style={{
                        flex: "1",
                        minWidth: "300px", // Ensures responsiveness
                        maxWidth: "32%", // Keeps them evenly sized
                        backgroundColor: "#fff",
                        border: "1px solid #e2e2e2",
                        padding: "20px",
                        paddingTop: "10px",
                        height: "300px",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "8px",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        position: "relative",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    {/* Info Icon at Top Right */}
                    <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                        <Tooltip text={box.info}>
                            <Info size={18} color="#555" />
                        </Tooltip>
                    </div>

                    {/* Box Content */}
                    <img src={box.icon} alt={box.heading} style={{ height: "80px", marginBottom: "15px" }} />
                    <h3 style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#333", textAlign: "left", width: "100%" }}>
                        {box.heading}
                    </h3>
                    <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "rgb(37, 0, 172)", textAlign: "left", marginTop: "5px", width: "100%" }}>
                        Resolved Count: {box.number}
                    </p>
                    <a
                        href={box.link}
                        style={{
                            textDecoration: "none",
                            color: "rgb(217, 155, 0)",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            marginTop: "20px",
                            textAlign: "left",
                            width: "100%",
                            fontFamily: "Arial, sans-serif",
                        }}
                    >
                        <hr />
                        <br />
                        Use this Feature
                    </a>
                </div>
            ))}
        </div>
    );
}

function Tooltip({ text, children }) {
    const [visible, setVisible] = useState(false);

    return (
        <div
            style={{ position: "relative", display: "inline-block" }}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && (
                <div
                    style={{
                        position: "absolute",
                        top: "25px",
                        right: "0",
                        backgroundColor: "#333",
                        color: "#fff",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        fontSize: "0.9rem",
                        whiteSpace: "nowrap",
                        zIndex: "10",
                    }}
                >
                    {text}
                </div>
            )}
        </div>
    );
}
