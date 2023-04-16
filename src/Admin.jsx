import { useEffect, useState } from "react";
import { useQuiz, removeItem, addItem, updateItem } from "./redux/quiz"

export default function Admin() {
    const [modalStatus, setModalStatus] = useState(false);

    const [title, setTitle] = useState("")
    const [answerArr, setAnswerArr] = useState([])
    const [correctAns, setCorrectAns] = useState(0)
    const id = Date.now();

    const [changeTitle, setChangeTitle] = useState("");
    const [updateAnswerArr, setUpdateAnswerArr] = useState([]);
    const [updateCorrectAns, setUpdateCorrectAns] = useState(0)

    const [currId, setCurrId] = useState();

    function handleChangeTitle(e) {
        setChangeTitle(e.target.value)
    }

    function handleUpdateAnswerArr(e, num) {
        const arrayCopy = [...updateAnswerArr];
        arrayCopy[num] = e.target.value
        setUpdateAnswerArr(arrayCopy);
    }

    function handleUpdateCorrect(e) {
        setUpdateCorrectAns(e.target.value)
    }

    function updateObj(id, title, questions, correctAnswer) {
        if (title && questions && correctAnswer) {
            updateItem({
                id,
                title,
                questions,
                correctAnswer
            })
            setModalStatus(false)
        }
    }

    function handleUpdate(id) {
        setModalStatus(true)
        setCurrId(id)
    }

    function handleAdd(title, questions, correctAnswer, id) {
        if (title && questions && correctAnswer) {
            const obj = {
                title,
                questions,
                correctAnswer,
                id
            }
            addItem(obj);
        }
    }

    function handleTitle(e) {
        setTitle(e.target.value)
    }

    function handleAnswerArr(e, num) {
        const arrayCopy = [...answerArr];
        arrayCopy[num] = e.target.value
        setAnswerArr(arrayCopy);
    }

    function handleCorrect(e) {
        setCorrectAns(e.target.value)
    }

    const data = useQuiz().questions;

    return (
        <>
            {modalStatus && (
                <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white flex flex-col gap-3 justify-center items-center py-3 px-2">
                        <button className="absolute top-2 right-2 font-bold text-2xl text-gray-700" onClick={() => setModalStatus(false)}>X</button>
                        <input
                            onChange={handleChangeTitle}
                            className="w-full border border-black px-3 py-2 text-lg"
                            placeholder="Question"
                        />
                        {[0, 1, 2, 3].map((num) => (
                            <input
                                key={num}
                                onChange={(e) => handleUpdateAnswerArr(e, num)}
                                className="w-full border border-black px-3 py-2 text-lg"
                                placeholder={`Answer ${num + 1}`}
                            />
                        ))}
                        <input
                            onChange={handleUpdateCorrect}
                            className="w-full border border-black px-3 py-2 text-lg"
                            placeholder="Correct answer"
                        />
                        <button
                            onClick={() => updateObj(currId, changeTitle, updateAnswerArr, updateCorrectAns)}
                            className="bg-blue-500 text-white px-8 py-2"
                        >
                            Done!
                        </button>
                    </div>
                </div>
            )}

            <div className="flex flex-col justify-center items-center py-10">
                <div className="flex flex-col gap-3 items-center">
                    <input
                        onChange={handleTitle}
                        className="w-full border border-black px-3 py-2 text-lg"
                        placeholder="Question"
                    />
                    {[0, 1, 2, 3].map((num) => (
                        <input
                            key={num}
                            onChange={(e) => handleAnswerArr(e, num)}
                            className="w-full border border-black px-3 py-2 text-lg"
                            placeholder={`Answer ${num + 1}`}
                        />
                    ))}
                    <input
                        onChange={handleCorrect}
                        className="w-full border border-black px-3 py-2 text-lg"
                        placeholder="Correct answer"
                    />
                    <button
                        onClick={() => handleAdd(title, answerArr, correctAns, id)}
                        className="bg-blue-500 text-white px-8 py-2 w-max"
                    >
                        Add
                    </button>

                    <div className="py-10">
                        <h1 className="text-3xl font-bold pb-5 border-b-2 border-gray-400">Current data</h1>
                        <div className="flex flex-wrap gap-5">
                            {data.map((quest) => (
                                <div
                                    key={quest.id}
                                    className="p-5 text-center border border-gray-400 flex flex-col gap-3"
                                >
                                    <h1 className="text-lg font-bold">{quest.title}</h1>
                                    {[0, 1, 2, 3].map((num) => (
                                        <p key={num}>Question {num + 1}: {quest.questions[num]}</p>
                                    ))}
                                    <p className="font-bold">Correct answer: {quest.correctAnswer}</p>
                                    <div className="flex justify-center items-center gap-5">
                                        <button
                                            onClick={() => removeItem(quest.id)}
                                            className="bg-red-500 text-white px-6 py-2"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => handleUpdate(quest.id)}
                                            className="bg-gray-700 text-white px-6 py-2"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}