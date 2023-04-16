import { useState } from 'react';
import { useQuiz } from './redux/quiz';

function App() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const data = useQuiz().questions;

  function correctGuess() {
    setScore(score + 1);
    setCurrentQuestion(currentQuestion + 1);
  }

  function falseGuess() {
    setCurrentQuestion(currentQuestion + 1);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white p-8 shadow-lg">
        {data.length > currentQuestion ? (
          <>
            <h1 className="text-5xl font-bold mb-10">{data[currentQuestion].title}</h1>
            <div className="grid grid-cols-2 gap-6">
              {data[currentQuestion].questions.map((item, index) => (
                <button
                  key={index}
                  onClick={index === data[currentQuestion].correctAnswer - 1 ? correctGuess : falseGuess}
                  className="w-full h-24 px-5 py-3 text-lg text-white bg-green-700 transition-colors duration-200 hover:bg-green-9  00 focus:outline-none"
                >
                  {item}
                </button>
              ))}
            </div>
            <h2 className="text-3xl font-bold mt-10">Score: {score}</h2>
          </>
        ) : (
          <div className="text-center">
            <p className="text-3xl font-bold mb-5">
              You are done with every question on this quiz!
            </p>
            <p className="text-xl font-medium mb-5">
              Head on to the admin page to add new questions.
            </p>
            <p className="text-3xl font-bold mb-5">
              You got {score} out of {data.length} points!!!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
