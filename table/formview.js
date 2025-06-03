class FormView {
    #container;
    #tableManager;
    #formContainer;

    /**
     * Konstruktor
     * @param {HTMLElement} container 
     * @param {TableManager} tableManager 
     */
    constructor(container, tableManager) {
        this.#container = container;
        this.#tableManager = tableManager;
        


        this.#formContainer = document.createElement('div');
        this.#formContainer.className = 'form-container';
        this.#container.appendChild(this.#formContainer);
        
        // hiba callback
        this.#tableManager.setErrorCallback((error) => {
            this.showError(error);
        });
        
        this.render();
    }

    /**
     * form renderelése
     */
    render() {
        this.#formContainer.innerHTML = `
            <h3>Új költő/vers hozzáadása</h3>
            <div class="form-group">
                <label for="koltoNev">Költő neve:</label>
                <input type="text" id="koltoNev" />
            </div>
            <div class="form-group">
                <label for="korszak">Korszak:</label>
                <input type="text" id="korszak" />
            </div>
            <div class="form-group">
                <label for="vers">Vers:</label>
                <input type="text" id="vers" />
            </div>
            <button id="addBtn">Hozzáadás</button>
            <div id="errorMsg" class="error"></div>
        `;
        
        this.#setupEventListeners();
    }

    /**
     * eventlistenerek beállítása
     */
    #setupEventListeners() {
        const addBtn = this.#formContainer.querySelector('#addBtn');
        addBtn.addEventListener('click', () => {
            this.#handleSubmit();
        });
    }

    /**
     * Form elküldése
     */
    #handleSubmit() {
        const nev = this.#formContainer.querySelector('#koltoNev').value.trim();
        const korszak = this.#formContainer.querySelector('#korszak').value.trim();
        const vers = this.#formContainer.querySelector('#vers').value.trim();
        
        // töröljük a hibát
        this.showError('');
        
        // validáció
        if (!nev || !korszak || !vers) {
            this.showError('Minden mező kitöltése kötelező!')
            return;
        }
        
        // hozzáadás
        this.#tableManager.addNewItem(nev, korszak, vers);
        
        // form ürítése
        this.#formContainer.querySelector('#koltoNev').value = '';
        this.#formContainer.querySelector('#korszak').value = ''
        this.#formContainer.querySelector('#vers').value = '';
    }

    /**
     * error megjelenítése
     * @param {string} message 
     */ 
    
    showError(message) {
        const errorMsg = this.#formContainer.querySelector('#errorMsg');
        errorMsg.textContent = message;
    }
}

export default FormView;