// frontend/src/pages/Form.jsx
import React, { useState, useEffect, useRef } from "react";

const FormPage = () => {
  // States to store speech output, translation and UI controls
  const [isSupported, setIsSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [originalTranscript, setOriginalTranscript] = useState("");
  const [translatedTranscript, setTranslatedTranscript] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // default target language: English
  const [error, setError] = useState("");

  // useRef to hold our SpeechRecognition instance across renders
  const recognitionRef = useRef(null);

  // Function that calls (a placeholder for) Bhashini’s translation API.
  const performTranslation = async (text, targetLang) => {
    try {
      // NOTE: Update the URL, payload, and headers to match Bhashini's live translation API.
      const response = await fetch("https://api.bhashini.ai/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Optionally add API keys here if needed:
          // 'Authorization': `Bearer ${process.env.REACT_APP_BHASHINI_API_KEY}`,
        },
        body: JSON.stringify({
          text: text,
          targetLang: targetLang,
        }),
      });
      if (!response.ok) {
        throw new Error("Translation API error");
      }
      const data = await response.json();
      return data.translation; // expected response: { translation: "translated text" }
    } catch (e) {
      throw new Error(e.message);
    }
  };

  // Initialize the Speech Recognition instance once when the component mounts.
  useEffect(() => {
    // Check for Web Speech API support in the browser
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      setError("Speech Recognition API is not supported on this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    // Enable continuous listening & interim results for live streaming text
    recognition.continuous = true;
    recognition.interimResults = true;
    // Set the source language to Marathi (as government speeches are in Marathi)
    recognition.lang = "mr-IN";

    // Process the results stream
    recognition.onresult = async (event) => {
      let finalTranscript = "";
      // Loop over new results
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        }
      }
      if (finalTranscript) {
        // Append the recognized speech to the original transcript display
        setOriginalTranscript((prev) => prev + finalTranscript);
        // Call translation API (simulate live translation)
        try {
          const translation = await performTranslation(
            finalTranscript,
            selectedLanguage
          );
          // Append the translation result to the translated transcript display
          setTranslatedTranscript((prev) => prev + translation + " ");
        } catch (err) {
          setError("Translation error: " + err.message);
        }
      }
    };

    recognition.onerror = (event) => {
      setError("Speech recognition error: " + event.error);
    };

    // Store the instance in the ref so that it can be used in our start/stop handlers.
    recognitionRef.current = recognition;
  }, [selectedLanguage]);

  // Function to start capturing the speech input
  const startListening = () => {
    setError("");
    if (recognitionRef.current && !listening) {
      try {
        recognitionRef.current.start();
        setListening(true);
      } catch (err) {
        setError("Failed to start speech recognition: " + err.message);
      }
    }
  };

  // Function to stop capturing speech input
  const stopListening = () => {
    if (recognitionRef.current && listening) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Live Speech Translation with Bhashini AI
      </h1>
      {/* Display error messages */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!isSupported && (
        <p className="text-red-500 mb-4">
          Your browser does not support the Speech Recognition API. Please try
          a supported browser.
        </p>
      )}
      {/* Language selection control */}
      <div className="mb-4">
        <label className="mr-2 font-semibold" htmlFor="langSelect">
          Select Target Language:
        </label>
        <select
          id="langSelect"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="border rounded p-2"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="ur">Urdu</option>
          <option value="gondi">Gondi</option>
          <option value="korku">Korku</option>
          <option value="warli">Warli</option>
          {/* Extend options as needed */}
        </select>
      </div>
      {/* Control panel for live translation */}
      <div className="mb-4">
        <button
          onClick={startListening}
          disabled={listening}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Start
        </button>
        <button
          onClick={stopListening}
          disabled={!listening}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Stop
        </button>
      </div>
      {/* Display panels for original and translated speech */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Original Speech (Marathi)
          </h2>
          <div className="border p-4 h-64 overflow-y-auto bg-gray-100">
            {originalTranscript || "Original speech will appear here..."}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Translated Speech
          </h2>
          <div className="border p-4 h-64 overflow-y-auto bg-gray-100">
            {translatedTranscript || "Translated text will appear here..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;