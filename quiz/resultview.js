class ResultView {
    #container;
    #answers;

    /**
     * Konstruktor
     * @param {HTMLElement} container 
     * @param {Array} answers 
     */
    constructor(container, answers) {
        this.#container = container;
        this.#answers = answers;
        
        this.render();
    }

    /**
     * resut renderelése
     */
    render() {
        const resultContainer = document.createElement('div');
        resultContainer.className = 'result-container';
        
        // cím
        resultContainer.innerHTML = '<h2>Eredmények</h2>';
        
        // statisztika
        const correctCount = this.#answers.filter(a => a.isCorrect).length;
        const totalCount = this.#answers.length;
        
        const statsDiv = document.createElement('p');
        statsDiv.innerHTML = `Helyes válaszok: ${correctCount}/${totalCount}`;
        resultContainer.appendChild(statsDiv);
        
        // minden válasz megjelenítése
        this.#answers.forEach(answer => {
            const resultItem = document.createElement('div');
            
            // helyes vagy helytelen osztály
            if (answer.isCorrect) {
                resultItem.className = 'result-item correct';
            } else {
                resultItem.className = 'result-item incorrect';
            }
            
            // tipus meghatározása
            const typeText = answer.card.type === 'era' ? 'Korszak' : 'Vers';
            
            // tartalom felépítése
            let html = `<strong>${typeText}:</strong> ${answer.card.content}<br>`;
            html += `<strong>Válaszod:</strong> ${answer.userAnswer}<br>`;
            
            // ha helytelen, megmutatjuk a helyes választ
            if (!answer.isCorrect) {
                html += `<strong>Helyes válasz:</strong> ${answer.card.correctAnswer}`;
            }
            
            resultItem.innerHTML = html;
            resultContainer.appendChild(resultItem);
        });
        
        this.#container.appendChild(resultContainer);
    }
}

export default ResultView;