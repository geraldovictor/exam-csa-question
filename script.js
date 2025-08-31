document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os blocos de pergunta
    const questionBlocks = document.querySelectorAll('.question-block');

    questionBlocks.forEach(block => {
        const answerList = block.querySelector('.answers');
        const answers = block.querySelectorAll('.answers li');
        const isMultipleChoice = answerList.classList.contains('multiple-choice');
        const checkButton = block.querySelector('.check-btn');

        if (isMultipleChoice) {
            // Lógica para perguntas de múltipla escolha
            answers.forEach(li => {
                li.addEventListener('click', () => {
                    // Se a pergunta já foi respondida, não faz nada
                    if (answerList.classList.contains('answered')) {
                        return;
                    }
                    // Adiciona ou remove a classe 'selected' ao clicar
                    li.classList.toggle('selected');
                });
            });

            // Adiciona o evento de clique ao botão de verificação
            checkButton.addEventListener('click', () => {
                answerList.classList.add('answered'); // Trava a pergunta
                
                answers.forEach(li => {
                    const isCorrect = li.getAttribute('data-correct') === 'true';
                    const isSelected = li.classList.contains('selected');

                    if (isCorrect) {
                        li.classList.add('correct'); // Marca as corretas em verde
                    } else if (isSelected && !isCorrect) {
                        li.classList.add('incorrect'); // Marca as selecionadas e incorretas em vermelho
                    }
                });

                checkButton.disabled = true; // Desabilita o botão após o uso
            });

        } else {
            // Lógica para perguntas de resposta única (como antes)
            answers.forEach(li => {
                li.addEventListener('click', () => {
                    if (answerList.classList.contains('answered')) {
                        return;
                    }
                    answerList.classList.add('answered');

                    const isCorrect = li.getAttribute('data-correct') === 'true';

                    if (!isCorrect) {
                        li.classList.add('incorrect');
                    }
                    
                    answers.forEach(answer => {
                        if (answer.getAttribute('data-correct') === 'true') {
                            answer.classList.add('correct');
                        }
                    });
                });
            });
        }
    });
});