class ActionBarView {
    #container;
    #quizManager;

    /**
     * Konstruktor
     * @param {HTMLElement} container 
     * @param {QuizManager} quizManager 
     */
    constructor(container, quizManager) {
        this.#container = container;
        this.#quizManager = quizManager;
        
        this.render();
    }

    /**
     * buttonok renderelése
     */
    render() {
        const actionBar = document.createElement('div');
        actionBar.className = 'action-bar';
        
        // költő nevek lekérése
        const poetNames = this.#quizManager.getPoetNames();
        
        // minden költőhöz egy gomb
        poetNames.forEach(poet => {
            const button = document.createElement('button');
            button.textContent = poet;
            
            // kattintás esemény
            button.addEventListener('click', () => {
                // válasz beküldése
                this.#quizManager.submitAnswer(poet);
            });
            
            actionBar.appendChild(button);
        });
        
        this.#container.appendChild(actionBar);
    }
}

export default ActionBarView;