export function validateQuiz(quizInfo, questions) {
    const errors = {};

    if (!quizInfo.title.trim()){
        errors.title = "Quiz title is required";
    }

    if (!quizInfo.access.trim()){
        errors.access = "Quiz access is required";
    }

    if (!quizInfo.category.trim()){
        errors.category = "Quiz category is required";
    }

    questions.forEach(qstn => {
        if(!qstn.text.trim()){
            errors.qstn = "All questions are required";
        }

        if(qstn.answer === 0){
            errors.qstn = "All questions must have answers";
        }
    });

    return errors;
}