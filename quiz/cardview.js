class CardView {
    #container;
    #card;

    /**
     * Konstruktor
     * @param {HTMLElement} container 
     * @param {Object} card 
     */
    constructor(container, card) {
        this.#container = container;
        this.#card = card;
        
        this.render();
    }

    /**
     * Kártya renderelése
     */
    render() {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';
        
        // típus meghatározása
        const typeText = this.#card.type === 'era' ? 'Korszak' : 'Vers';
        
        // kártya HTML
        cardContainer.innerHTML = `
            <div class="card">
                <h3>${typeText}</h3>
                <p>${this.#card.content}</p>
            </div>
        `;
        
        this.#container.appendChild(cardContainer);
    }
}

export default CardView;