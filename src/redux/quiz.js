import { createReduxModule } from "hooks-for-redux";

const initalState = {
    quizzStated: true,
    showResult: false,
    currentQuestion: 0,
    score: 0,
    questions: [
        {
            title: "Vilket är världens största land?",
            questions: ["Kina", "Canada", "USA", "Brasilien"],
            correctAnswer: 1,
            id: 1,
        },
        {
            title: "Vilken är världens största stad?",
            questions: ["New York", "Tokyo", "Shanghai", "London"],
            correctAnswer: 3,
            id: 2,
        },
    ],
};


export const [useQuiz, { removeItem, addItem, updateItem }] = createReduxModule(
    "quiz",
    initalState,
    {
        removeItem: (state, id) => {
            return {
                ...state,
                questions: state.questions.filter((item) => id !== item.id)
            };
        },
        addItem: (state, obj) => {
            return {
                ...state,
                questions: [...state.questions, obj],
            };
        },
        updateItem: (state, objWithId) => {
            return {
                ...state,
                questions: [...state.questions.map((item) => {
                    if (objWithId.id === item.id) {
                        item.title = objWithId.title
                        item.questions = objWithId.questions
                        item.correctAnswer = objWithId.correctAnswer
                        return item;
                    }
                    return item;
                })]
            };
        },


    }
)