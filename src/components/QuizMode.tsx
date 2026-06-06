import React, {useState, useRef} from "react";
import {CodonTable} from "../logic/CodonTable";
import {QuizEngine, QuizMode as QuizModeType, QuizQuestion, QuizStats} from "../logic/QuizEngine";
import CodonWheel from "./CodonWheel";

interface QuizModeProps{
    onClose: ()=> void;
}

type FlowStage="setup"|"active"|"results";

export default function QuizMode(props: QuizModeProps){
    let engineRef=useRef(new QuizEngine(new CodonTable()));
    let [stage, setStage]=useState<FlowStage>("setup");
    let [quizMode, setQuizMode]=useState<QuizModeType>("codon-to-amino");
    let [questionCount, setQuestionCount]=useState<number>(10);
    let [questions, setQuestions]=useState<QuizQuestion[]>([]);
    let [currentQ, setCurrentQ]=useState<number>(0);
    let [selectedIdx, setSelectedIdx]=useState<number|null>(null);
    let [showAnswer, setShowAnswer]=useState<boolean>(false);
    let [stats, setStats]=useState<QuizStats>({total: 0, correct: 0, streak: 0, bestStreak: 0});
    let [wrongAnswers, setWrongAnswers]=useState<{question: QuizQuestion; selectedIdx: number}[]>([]);

    function startQuiz(){
        let engine=engineRef.current;
        engine.resetStats();
        let batch=engine.generateBatch(quizMode, questionCount);
        setQuestions(batch);
        setCurrentQ(0);
        setSelectedIdx(null);
        setShowAnswer(false);
        setWrongAnswers([]);
        setStats(engine.getStats());
        setStage("active");
    }

    function handleSelect(idx: number){
        if (showAnswer) return;
        setSelectedIdx(idx);
        setShowAnswer(true);
        let engine=engineRef.current;
        let question=questions[currentQ];
        let correct=engine.checkAnswer(question, idx);
        if (!correct){
            setWrongAnswers(prev=>[...prev, {question, selectedIdx: idx}]);
        }
        setStats(engine.getStats());
    }

    function handleNext(){
        if (currentQ+1>=questions.length){
            setStage("results");
            return;
        }
        setCurrentQ(prev=>prev+1);
        setSelectedIdx(null);
        setShowAnswer(false);
    }

    function handleRetry(){
        startQuiz();
    }

    function renderSetup(){
        return (
            <div className="quiz-setup">
                <h2>Quiz Mode</h2>
                <p className="quiz-desc">Test your knowledge of the genetic code!</p>
                <div className="form-group">
                    <label>Question Type</label>
                    <div className="quiz-mode-options">
                        <button
                            type="button"
                            className={`quiz-mode-btn ${quizMode==="codon-to-amino"?"active":""}`}
                            onClick={()=>setQuizMode("codon-to-amino")}
                        >
                            Codon → Amino Acid
                        </button>
                        <button
                            type="button"
                            className={`quiz-mode-btn ${quizMode==="amino-to-codon"?"active":""}`}
                            onClick={()=>setQuizMode("amino-to-codon")}
                        >
                            Amino Acid → Codon
                        </button>
                        <button
                            type="button"
                            className={`quiz-mode-btn ${quizMode==="mixed"?"active":""}`}
                            onClick={()=>setQuizMode("mixed")}
                        >
                            Mixed
                        </button>
                    </div>
                </div>
                <div className="form-group">
                    <label>Number of Questions</label>
                    <div className="quiz-count-options">
                        {[10, 20, 64].map(n=>(
                            <button
                                key={n}
                                type="button"
                                className={`quiz-count-btn ${questionCount===n?"active":""}`}
                                onClick={()=>setQuestionCount(n)}
                            >
                                {n}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="quiz-actions">
                    <button type="button" className="action-btn" onClick={startQuiz}>Start Quiz</button>
                    <button type="button" className="action-btn danger" onClick={props.onClose}>Back</button>
                </div>
            </div>
        );
    }

    function renderActive(){
        let question=questions[currentQ];
        let progress=((currentQ)/questions.length)*100;
        return (
            <div className="quiz-active">
                <div className="quiz-header">
                    <div className="quiz-progress-bar">
                        <div className="quiz-progress-fill" style={{width: `${progress}%`}}></div>
                    </div>
                    <div className="quiz-score-display">
                        <span>{currentQ+1} / {questions.length}</span>
                        <span className="quiz-streak">Streak: {stats.streak}</span>
                        <span className="quiz-correct-count">{stats.correct} correct</span>
                    </div>
                </div>
                <div className="quiz-question">
                    <h3>{question.question}</h3>
                </div>
                <div className="quiz-options">
                    {question.options.map((option, idx)=>(
                        <button
                            key={idx}
                            type="button"
                            className={
                                "quiz-option"+
                                (showAnswer&&idx===question.correctIndex?" correct":"")+
                                (showAnswer&&selectedIdx===idx&&idx!==question.correctIndex?" wrong":"")
                            }
                            onClick={()=>handleSelect(idx)}
                            disabled={showAnswer}
                        >
                            <span className="quiz-option-letter">{String.fromCharCode(65+idx)}</span>
                            <span className="quiz-option-text">{option}</span>
                        </button>
                    ))}
                </div>
                {showAnswer&&(
                    <div className="quiz-feedback">
                        {selectedIdx===question.correctIndex?(
                            <span className="quiz-feedback-correct">Correct!</span>
                        ):(
                            <span className="quiz-feedback-wrong">
                                Wrong — the answer is {question.options[question.correctIndex]}
                            </span>
                        )}
                        <button type="button" className="action-btn" onClick={handleNext}>
                            {currentQ+1>=questions.length?"See Results":"Next Question"}
                        </button>
                    </div>
                )}
                <div className="quiz-codon-wheel-ref">
                    <CodonWheel />
                </div>
            </div>
        );
    }

    function renderResults(){
        let pct=stats.total>0?Math.round((stats.correct/stats.total)*100):0;
        return (
            <div className="quiz-results">
                <h2>Quiz Results</h2>
                <div className="quiz-results-score">
                    <div className="quiz-results-pct">{pct}%</div>
                    <div className="quiz-results-detail">
                        {stats.correct} of {stats.total} correct
                    </div>
                    <div className="quiz-results-detail">
                        Best streak: {stats.bestStreak}
                    </div>
                </div>
                {wrongAnswers.length>0&&(
                    <div className="quiz-wrong-list">
                        <h3>Incorrect Answers</h3>
                        {wrongAnswers.map((wa, i)=>(
                            <div key={i} className="quiz-wrong-item">
                                <div className="quiz-wrong-question">{wa.question.question}</div>
                                <div className="quiz-wrong-answers">
                                    <span className="quiz-wrong-selected">Your answer: {wa.question.options[wa.selectedIdx]}</span>
                                    <span className="quiz-wrong-correct">Correct: {wa.question.options[wa.question.correctIndex]}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="quiz-actions">
                    <button type="button" className="action-btn" onClick={handleRetry}>Try Again</button>
                    <button type="button" className="action-btn danger" onClick={props.onClose}>Back to Converter</button>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            {stage==="setup"&&renderSetup()}
            {stage==="active"&&renderActive()}
            {stage==="results"&&renderResults()}
        </div>
    );
}
