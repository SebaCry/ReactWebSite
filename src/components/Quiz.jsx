import { useState } from "react"
import Results from "./Results"

function Quiz() {
    const questionBank = [
        {
            question: "What is the capital of Colombia?",
            options: ["Berlin", "Paris", "London", "Bogota"],
            answer : "Bogota"
        },
        {
            question: "Which language is used for web apps?",
            options: ["PHP", "Python", "Javascript", "All"],
            answer : "All"
        },
        {
            question: "What does JSX stand on?",
            options: [
                "JavaScript XML", 
                "Java Syntax eXtension", 
                "Just a Simple eXample", 
                "None of the above"
            ],
            answer : "JavaScript XML"
        },
        
    ]
    
    const initialAnswers = [null, null, null]

    const [userAnswers, setUserAnswers] = useState(initialAnswers)
    const [currentQuestion, setCurrentQuestion] = useState(0)

    const [isQuizFinish, setIsQuizFinish] = useState(false)

    const selectedAnswer = userAnswers[currentQuestion]

    function handleSelectOption (option) {
        const newUserAnswers = [...userAnswers]
        newUserAnswers[currentQuestion] = option

        setUserAnswers(newUserAnswers)
    }

    function goToNext() {
        if (currentQuestion == questionBank.length - 1) {
            setIsQuizFinish(true)
        } else {
            setCurrentQuestion(currentQuestion + 1)
        }
        
    }

    function goToPrev() {
       if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1) 
       } 
    }

    function restartQuiz(){
        setUserAnswers(initialAnswers)
        setCurrentQuestion(0)
        setIsQuizFinish(false)
    }

    if (isQuizFinish) {
        return (
            <Results 
                userAnswers={userAnswers} 
                questionBank={questionBank}
                restartQuiz={restartQuiz}
            />
        )
    }
    return (
        <div>
            <h2> Question {currentQuestion + 1}</h2>
            <p className="question"> {questionBank[currentQuestion].question} </p>

            {questionBank[currentQuestion].options.map((option) => (
                <button className={"option" + (selectedAnswer === option ? " selected" : "")} onClick={() => handleSelectOption(option)}> 
                    {option} 
                </button>
            ))}

            <div className="nav-buttons">
                <button onClick={goToPrev} disabled={currentQuestion === 0}> 
                    Previuos 
                </button>
                <button onClick={goToNext} disabled={!selectedAnswer}> 
                    {currentQuestion === questionBank.length - 1 ? "Finish Quiz" : "Next"}
                </button>
            </div>
        </div>
    )
}

export default Quiz