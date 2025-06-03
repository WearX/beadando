class DataRepository {
    #adatok;

    /**
     * Konstruktor
     */
    constructor() {
        this.#adatok = [];
    }

    /**
     * Adatok getter
     * @returns {Array}
     */
    get adatok() {
        return this.#adatok;
    }

    /**
     * Költő hozzáadása
     * @param {string} nev 
     * @param {string} korszak 
     * @param {string} vers 
     * @returns {Promise}
     */
    addKolto(nev, korszak, vers) {
        return new Promise((resolve, reject) => {
            // megkeressük hogy van-e már ilyen költő és korszak
            let koltoEntry = this.#adatok.find(entry => 
                entry.nev === nev && entry.korszak === korszak
            );

            if (koltoEntry) {
                // ha már van 3 vers akkor nem lehet több
                if (koltoEntry.versek.length >= 3) {
                    reject("Nem lehetséges újabb vers felvétele az adott költőnek ehhez a korszakához");
                } else {
                    koltoEntry.versek.push(vers);
                    resolve();
                }
            } else {
                // új költő és korszak
                this.#adatok.push({
                    nev: nev,
                    korszak: korszak,
                    versek: [vers]
                });
                resolve();
            }
        });
    }

    /**
     * CSV exportálás
     * @returns {string}
     */
    exportToCSV() {
        let csv = "Költő neve,Korszak,Versek\n";
        
        this.#adatok.forEach(entry => {
            csv += `"${entry.nev}","${entry.korszak}","${entry.versek.join(', ')}"\n`
        });
        
        return csv
    }

    /**
     * CSV importálás
     * @param {string} csvData 
     * @returns {Promise}
     */
    importFromCSV(csvData) {
        return new Promise((resolve , reject) => {
            try {
                const lines = csvData.trim().split('\n');
                
                if (lines.length < 2) {
                    reject("Hibás CSV formátum");
                    return;
                }

                // első sor a fejléc, azt kihagyjuk
                for (let i = 1; i < lines.length; i++) {
                    const match = lines[i].match(/^"([^"]+)","([^"]+)","([^"]+)"$/);
                    if (match) {
                        const [_, nev, korszak, versekStr] = match;
                        const versek = versekStr.split(', ');
                        
                        // minden verset hozzáadunk
                        versek.forEach(vers => {
                            this.addKolto(nev, korszak, vers).catch(() => {
                                // ha nem sikerül nem baj, mehet a többi
                            });
                        });
                    }
                }
                
                resolve();
            } catch (error) {
                reject(error )
            }
        })
    }
}

export default DataRepository;