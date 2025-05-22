import React, { useState, useEffect, useRef } from 'react';

function Threats() {
  // 1. Define the legal form fields.
  const fields = [
    {
      name: 'fullName',
      label: 'Full Legal Name',
      instructions: 'Enter your complete legal name as it appears on official records.',
    },
    {
      name: 'address',
      label: 'Residential Address',
      instructions:
        'Provide your full residential address including street, city, state, and postal code.',
    },
    {
      name: 'email',
      label: 'Email Address',
      instructions:
        'Enter your active email address for correspondence and case updates.',
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      instructions:
        'Provide your contact number with the country code if applicable.',
    },
    {
      name: 'caseTitle',
      label: 'Case Title',
      instructions: 'Enter a brief title for your legal case or complaint.',
    },
    {
      name: 'caseDescription',
      label: 'Case Description',
      instructions:
        'Describe your legal issue in detail, including relevant events and dates.',
    },
    {
      name: 'defendantDetails',
      label: 'Defendant Details',
      instructions:
        'Provide the full legal name and contact information of the opposing party (if applicable).',
    },
    {
      name: 'dateOfIncident',
      label: 'Date of Incident',
      instructions: 'Specify the exact date when the incident or issue occurred.',
    },
    {
      name: 'evidence',
      label: 'Evidence Links',
      instructions:
        'Provide links or references to any evidence that supports your claim.',
    },
    {
      name: 'additionalRemarks',
      label: 'Additional Remarks',
      instructions:
        'Enter any extra information or remarks that might help support your legal case.',
    },
  ];

  // 2. State management.
  // - currentFieldIndex tracks which form field is active.
  // - formData stores user responses.
  // - listening tracks whether the Speech Recognition API is active.
  // - botSpeaking tracks whether the bot (Speech Synthesis) is currently speaking.
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [listening, setListening] = useState(false);
  const [botSpeaking, setBotSpeaking] = useState(false);
  const recognitionRef = useRef(null);

  // 3. Initialize the Speech Recognition API.
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setListening(false);
      };

      recognitionRef.current.onend = () => {
        setListening(false);
      };
    } else {
      console.error("Browser doesn't support Speech Recognition");
    }
  }, []);

  // 4. When the current field changes, update the speech recognition callback
  // and immediately speak the field’s instructions.
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleInputResult(transcript);
      };
    }
    if (fields[currentFieldIndex]) {
      const { label, instructions } = fields[currentFieldIndex];
      const utterance = new SpeechSynthesisUtterance(`Field: ${label}. ${instructions}`);
      // Attach event handlers to record when the bot starts and stops speaking.
      utterance.onstart = () => setBotSpeaking(true);
      utterance.onend = () => setBotSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  }, [currentFieldIndex]);

  // 5. When speech recognition returns a transcript, update the corresponding field.
  const handleInputResult = (transcript) => {
    const fieldName = fields[currentFieldIndex].name;
    setFormData((prev) => ({ ...prev, [fieldName]: transcript }));
  };

  // 6. Start voice recording for user input.
  const startListening = () => {
    if (recognitionRef.current) {
      setListening(true);
      recognitionRef.current.start();
    }
  };

  // 7. Navigation functions.
  const handleNextField = () => {
    if (currentFieldIndex < fields.length - 1) {
      setCurrentFieldIndex(currentFieldIndex + 1);
    } else {
      alert("Form completed! Data:\n" + JSON.stringify(formData, null, 2));
    }
  };

  const handlePreviousField = () => {
    if (currentFieldIndex > 0) {
      setCurrentFieldIndex(currentFieldIndex - 1);
    }
  };

  // 8. Ask a question for the current field.
  // When called, the bot speaks the prompt, then starts listening.
  const handleAskQuestion = () => {
    const utterance = new SpeechSynthesisUtterance(
      `You can ask your question regarding ${fields[currentFieldIndex].label}. After clicking, please speak your question.`
    );
    utterance.onstart = () => setBotSpeaking(true);
    utterance.onend = () => setBotSpeaking(false);
    speechSynthesis.speak(utterance);
    startListening();
  };

  // 9. Allow manual input modifications.
  const handleInputChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  // 10. Form submission handler.
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! Data:\n' + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 p-6">
      <div className="relative max-w-6xl mx-auto">
        {/* Left Pane: Legal Form Fields with right margin */}
        <div className="bg-white rounded-xl shadow-lg p-6 mr-[33%]">
          <h2 className="text-3xl font-bold mb-4">Legal Form</h2>
          <form onSubmit={handleSubmit}>
            {fields.map((field, index) => {
              const isActive = index === currentFieldIndex;
              return (
                <div
                  key={field.name}
                  className={`mb-4 p-4 rounded transition-transform ${
                    isActive
                      ? 'bg-blue-50 border border-blue-300 scale-105'
                      : 'bg-gray-50'
                  }`}
                >
                  <label className="block text-xl font-semibold text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <p className="text-gray-600 text-sm mb-2">
                    {field.instructions}
                  </p>
                  <input
                    type={field.name === 'dateOfIncident' ? 'date' : 'text'}
                    value={formData[field.name] || ''}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    placeholder={`Enter ${field.label}`}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              );
            })}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-400 to-blue-500 hover:from-indigo-500 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-md shadow-md focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Right Pane: Permanent Fixed AI Bot Assistant Panel */}
        <div className="fixed top-0 right-0 h-full w-[33%] bg-gray-100 p-6 border-l border-gray-300 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            AI Bot Assistant
          </h2>
          {/* Navigation Controls */}
          <div className="flex justify-center gap-2 mb-4">
            <button
              type="button"
              onClick={handlePreviousField}
              disabled={currentFieldIndex === 0}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNextField}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
          {/* AI Bot Visual: Show animated GIF if bot is speaking, else static GIF */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={botSpeaking ? '/mic-animated.gif' : '/mic-static.gif'}
              alt="AI Bot Microphone"
              className="w-25 h-24 rounded-full"
            />
          </div>
          {/* AI Bot Action Buttons */}
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={startListening}
              disabled={listening}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            >
              {listening ? 'Recording...' : 'Record'}
            </button>
            <button
              type="button"
              onClick={handleAskQuestion}
              disabled={listening}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
            >
              Ask
            </button>
            <button
              type="button"
              onClick={() => {
                const { label, instructions } = fields[currentFieldIndex];
                const utterance = new SpeechSynthesisUtterance(`Field: ${label}. ${instructions}`);
                // Attach onstart/onend events for bot speaking.
                utterance.onstart = () => setBotSpeaking(true);
                utterance.onend = () => setBotSpeaking(false);
                speechSynthesis.speak(utterance);
              }}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded"
            >
              Hear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Threats;
