class ImportExportView {
    #container;
    #tableManager;
    #importExportContainer;

    /**
     * Konstruktor
     * @param {HTMLElement} container 
     * @param {TableManager} tableManager 
     */
    constructor(container, tableManager) {
        this.#container = container;
        this.#tableManager = tableManager;
        
        this.#importExportContainer = document.createElement('div');
        this.#importExportContainer.className = 'import-export-container';
        this.#container.appendChild(this.#importExportContainer);
        
        this.render();
    }

    /**
     * rendeleselése
     */
    render() {
        this.#importExportContainer.innerHTML = `
            <div>
                <h3>Importálás</h3>
                <input type="file" id="csvFileInput" accept=".csv" />
                <button id="importBtn">CSV fájl importálása</button>
            </div>
            <div>
                <h3>Exportálás</h3>
                <button id="exportBtn">CSV exportálása</button>
            </div>
        `;
        
        this.#setupEventListeners();
    }

    /**
     * eventlistenerek beállítása
     */
    #setupEventListeners() {
        const importBtn = this.#importExportContainer.querySelector('#importBtn');
        const exportBtn = this.#importExportContainer.querySelector('#exportBtn');
        const fileInput = this.#importExportContainer.querySelector('#csvFileInput');
        
        importBtn.addEventListener('click', () => {
            const file = fileInput.files[0];
            if (file) {
                this.#handleImport(file);
            }
        });
        
        exportBtn.addEventListener('click', () => {
            this.#handleExport();
        });
    }

    /**
     * Importalás kezelése
     * @param {File} file 
     */
    #handleImport(file) {
        this.#readFile(file).then(content => {
            return this.#tableManager.importData(content);
        }).then(() => {
            // táblázat frissítése
            this.#tableManager.refresh();
        }).catch(error => {
            alert('Hiba történt az importáláskor');
        });
    }

    /**
     * fájl olvasása 
     * @param {File} file 
     * @returns {Promise<string>}
     */
    #readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    /**
     * export kezelése
     */
    #handleExport() {
        const csvData = this.#tableManager.exportData();
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'koltok.csv';
        link.click();
    }
}

export default ImportExportView;