import React, { useState } from "react";
import NavbarWithCTAButton from "../components/Nav";
import {
  Card,
  TextInput,
  Label,
  Button,
  Spinner,
  Rating,
  Select,
} from "flowbite-react";
function Home() {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [text, setText] = useState("");
  const [sentence, setSentence] = useState("");
  const [translationResult, setTranslationResult] = useState("");
  const [detectionResult, setDetectionResult] = useState("");
  const [rating, ] = useState(0);
  const [id, setId] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");

  const [hoverValue, setHoverValue] = useState(0);
  const handleHover = (value) => {
    setHoverValue(value);
  };

  const handleClick = async (value) => {
    const url = `http://localhost:5050/api/v1/rate`;
    let rating = value;
    const data = { rating, id };
    try {
      const response = await fetch(url, {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (response.status === 200) {
        setError(res.message);
      }
    } catch (error) {
      setError("Failed to rate translation...Try Again.");
    }
  };

  let translate = async () => {
    setLoading(true);
    if (
      !text ||
      text.trim === "" ||
      !targetLanguage ||
      targetLanguage.trim() === ""
    ) {
      setError("Please enter required field(s)!!!");
      setLoading(false);
      return;
    }
    const url = `http://localhost:5050/api/v1/translate`;
    const data = { targetLanguage, text };
    try {
      const response = await fetch(url, {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      const res = await response.json();
      setError(res.message);
      if (response.status === 200) {
        setTranslationResult(res.data.translation);
        setId(res.data.id);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Failed to get translation...Try Again.");
    }
  };

  let detect = async () => {
    setLoading1(true);
    if (!sentence || sentence.trim === "") {
      setError1("Please enter required field(s)!!!");
      setLoading1(false);
      return;
    }
    const url = `http://localhost:5050/api/v1/detect`;
    const data = { sentence };
    try {
      const response = await fetch(url, {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      const res = await response.json();
      setError1(res.message);
      console.log(res);
      if (response.status === 200) {
        setDetectionResult(res.data);
      }
      setLoading1(false);
      // setError1("");
    } catch (error) {
      setLoading1(false);
      setError1("Failed to detect language.");
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <NavbarWithCTAButton />
        <div>
          {/* translation */}
          <Card className="rounded-3xl">
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Translation Platform
              </h5>
            </div>
            <p className="text-red-600">{error}</p>
            <form className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Your Input" />
                </div>
                <TextInput
                  id="email1"
                  type="text"
                  placeholder="Enter your text..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="translateOptions" value="Translate to" />
                </div>
                <Select
                  id="translateOptions"
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  required
                >
                  <option value="">Select a Language</option>
                  <option value="English">English</option>
                  <option value="Hausa">Hausa</option>
                  <option value="Igbo">Igbo</option>
                  <option value="Yoruba">Yoruba</option>
                  <option value="French">French</option>
                  <option value="Portuguese">Portuguese</option>
                  <option value="Pidgin">Pidgin</option>
                </Select>
              </div>

              <Button type="button" onClick={() => translate()}>
                {loading ? (
                  <Spinner aria-label="Default status example" />
                ) : (
                  "Translate"
                )}
              </Button>
            </form>

            <div className="flow-root">
              <div>
                <p className="text-sm text-gray-900 dark:text-white font-bold">
                  Translation Result:{" "}
                  <span className="font-normal">{translationResult}</span>
                </p>
                <div className="flex w-fit align-middle mt-5">
                  {translationResult ? (
                    <div>
                      Rate:
                      <Rating>
                        {[...Array(5)].map((star, index) => {
                          const starValue = index + 1;
                          return (
                            <Rating.Star
                              key={index}
                              filled={starValue <= (hoverValue || rating)}
                              onMouseEnter={() => handleHover(starValue)}
                              onMouseLeave={() => handleHover(0)}
                              onClick={() => handleClick(starValue)}
                            />
                          );
                        })}
                      </Rating>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Detection */}
          <Card className="rounded-3xl mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Language Detection
              </h5>
            </div>
            <p className="text-red-600">{error1}</p>
            <form className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Your Input" />
                </div>
                <TextInput
                  id="email1"
                  type="text"
                  placeholder="Enter your sentence..."
                  value={sentence}
                  onChange={(e) => setSentence(e.target.value)}
                  required
                />
              </div>

              <Button type="button" onClick={() => detect()}>
                {loading1 ? (
                  <Spinner aria-label="Default status example" />
                ) : (
                  "Detect Language"
                )}
              </Button>
            </form>

            <div className="flow-root">
              <div>
                <p className="text-sm text-gray-900 dark:text-white font-bold">
                  Detected Language:{" "}
                  <span className="font-normal">{detectionResult}</span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Home;
