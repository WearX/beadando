class TableView {
    #container;
    #tableManager;
    #tableContainer;

    /**
     * Konstruktor
     * @param {HTMLElement} container 
     * @param {TableManager} tableManager 
     */
    constructor(container, tableManager) {
        this.#container = container;
        this.#tableManager = tableManager;
        
        this.#tableContainer = document.createElement('div');
        this.#container.appendChild(this.#tableContainer);
        
        // callback beállítása
        this.#tableManager.setNewItemCallback(() => {
            this.render();
        });
        
        this.render();
    }

    /**
     * table renderelése
     */
    render() {
        const data = this.#tableManager.getData();
        
        let html = '<table>';
        html += '<thead>';
        html += '<tr>';
        html += '<th>Költő neve</th>';
        html += '<th>Korszak neve</th>';
        html += '<th colspan="3">Versek</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        
        data.forEach(entry => {
            html += '<tr>';
            html += `<td>${entry.nev}</td>`;
            html += `<td>${entry.korszak}</td>`;
            
            // versek hozzáadása
            for (let i = 0; i < 3; i++) {
                if (entry.versek[i]) {
                    html += `<td>${entry.versek[i]}</td>`;
                } else {
                    html += '<td></td>';
                }
            }
            
            html += '</tr>';
        });
        
        html += '</tbody>';
        html += '</table>';
        
        this.#tableContainer.innerHTML = html;
    }
}

export default TableView;