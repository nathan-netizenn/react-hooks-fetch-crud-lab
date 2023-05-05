import React, { useState, useEffect } from 'react';
import QuestionItem from './QuestionItem';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions from API on component mount
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:4000/questions');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  const handleDeleteQuestion = async (id) => {
    // Delete question from API and update state
    try {
      await fetch(`http://localhost:4000/questions/${id}`, {
        method: 'DELETE'
      });
      setQuestions(prevQuestions =>
        prevQuestions.filter(question => question.id !== id)
      );
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleUpdateCorrectAnswer = async (id, correctIndex) => {
    // Update correct answer of question in API and update state
    try {
      await fetch(`http://localhost:4000/questions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correctIndex })
      });
      setQuestions(prevQuestions =>
        prevQuestions.map(question => {
          if (question.id === id) {
            return { ...question, correctIndex };
          } else {
            return question;
          }
        })
      );
    } catch (error) {
      console.error('Error updating correct answer:', error);
    }
  };

  return (
    <div>
      <h2>Questions</h2>
      {questions.map(question => (
        <QuestionItem
          key={question.id}
          question={question}
          onDelete={handleDeleteQuestion}
          onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
        />
      ))}
    </div>
  );
};
export default QuestionList;