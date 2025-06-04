import DataRepository from './core/datarepository.js';
import WorkplaceManager from './core/workplacemanager.js';
import WorkplaceView from './view/workplaceview.js';
import ButtonView from './view/buttonview.js';



    // adattároló létrehozása
    const dataRepository = new DataRepository();
    
    // workplace manager létrehozása
    const workplaceManager = new WorkplaceManager();
    
    // HTML elemek
    const workplace = document.getElementById('workplace');
    const buttonContainer = document.getElementById('buttonContainer');
    
    // view-k létrehozása
    const workplaceView = new WorkplaceView(workplace, workplaceManager);
    const buttonView = new ButtonView(buttonContainer, workplaceManager);
    
    // dataRepository átadása a workplaceView-nak
    workplaceView.setDataRepository(dataRepository);
    
    // kezdő adatok hozzáadása
    loadInitialData(dataRepository);
    
    // kezdő nézet megjelenítése
    workplaceManager.showTableView();

/**
 * Kezdő adatok betöltése
 * @param {DataRepository} dataRepository 
 */
function loadInitialData(dataRepository) {
    // Petőfi Sándor
    dataRepository.addKolto('Petőfi Sándor', 'Romantikus szabadságeszmény', 'Szeptember végén');
    dataRepository.addKolto('Petőfi Sándor', 'Romantikus szabadságeszmény', 'Egy gondolat bánt engemet');
    dataRepository.addKolto('Petőfi Sándor', 'Politikai költészet', 'Nemzeti dal');
    dataRepository.addKolto('Petőfi Sándor', 'Politikai költészet', 'Föltámadott a tenger');
    
    // Ady Endre
    dataRepository.addKolto('Ady Endre', 'Szimbolizmus', 'Góg és Magóg fia vagyok én');
    dataRepository.addKolto('Ady Endre', 'Forradalmi látomások', 'A Sion-hegy alatt');
    
    // József Attila
    dataRepository.addKolto('József Attila', 'Avantgárd korszak', 'Tiszta szívvel');
    dataRepository.addKolto('József Attila', 'Kései költészet', 'Levegőt!');
    dataRepository.addKolto('József Attila', 'Kései költészet', 'Talán eltűnök hirtelen');
    
    // Radnóti Miklós
    dataRepository.addKolto('Radnóti Miklós', 'Korai versek', 'Pogány köszöntő');
    dataRepository.addKolto('Radnóti Miklós', 'Háborús költészet', 'Nem tudhatom');
    dataRepository.addKolto('Radnóti Miklós', 'Háborús költészet', 'Hetedik ecloga');
}