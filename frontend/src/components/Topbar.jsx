import React from 'react';

const TopBar = () => {
    return (
        <div
            style={{
                position: 'relative',
                left: 0,
                right: 0,
                height: '100px', // Adjust as needed
                backgroundColor: '#f1f1f1',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
            }}
        >
            {/* LEFT SECTION */}
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    justifyContent: 'flex-start',
                }}
            >
                <img
                    src="gov.png"
                    alt="Department of India Logo"
                    style={{ height: '70px' }}
                />
            </div>

            {/* NAVIGATION LINKS (CENTER) */}
            <nav
                style={{
                    flex: 1,
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'flex-end',
                    paddingBottom: '10px',
                }}
            >
                <a href="#home" style={linkStyle}>Home</a>
                <a href="#about" style={linkStyle}>About</a>
                <a href="#anyan" style={linkStyle}>Anyan</a>
                <a href="#anyan" style={linkStyle}>Anyan</a>
            </nav>

            {/* RIGHT SECTION */}
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    justifyContent: 'flex-end',
                }}
            >
                <img
                    src="Bhashini.png"
                    alt="Bhashini Logo"
                    style={{ height: '50px' }}
                />
                <button
                    style={{
                        backgroundColor: '#1e73be',
                        color: '#fff',
                        border: 'none',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        borderRadius: '4px',
                        transition: 'background-color 0.3s ease',
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#155a9c'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#1e73be'}
                >
                    Bharateeyan
                </button>
            </div>
        </div>
    );
};

// Reusable link style with improved hover effect
const linkStyle = {
    textDecoration: 'none',
    color: '#000',
    fontSize: '1rem',
    position: 'relative',
    padding: '4px 8px',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
};

// Injecting hover effect via CSS
const hoverEffect = `
    a {
        position: relative;
        text-decoration: none;
        padding-right: 12px;
    }

    a::after {
        content: '>';
        position: absolute;
        left: 100%;
        margin-left: 5px;
        opacity: 0;
        transform: translateX(-10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    a:hover {
        color:rgb(0, 0, 0);
    }

    a:hover::after {
        opacity: 1;
        transform: translateX(0);
    }

    a:hover::before {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color:rgb(0, 0, 0);
        transition: width 0.3s ease;
    }
`;

// Inject the hover effect into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = hoverEffect;
document.head.appendChild(styleSheet);

export default TopBar;
