let dbPromise = idb.open('ghossan', 1, upgradeDB => {
    if(!upgradeDB.objectStoreNames.contains('teams')){
        upgradeDB.createObjectStore('teams', {keyPath:"id"});
    }
})

const addTeam = (id,logo,name,venue,website) => {
    dbPromise
    .then(db => {
        let tx = db.transaction('teams', 'readwrite');
        let store = tx.objectStore('teams');
        let item = {
            id: parseInt(id),
            logo: logo,
            name: name,
            venue: venue,
            website: website,
            created: new Date().getTime()
        };
        store.add(item);
        return tx.complete;
    })
    .then(() => M.toast({html:'Favorite telah disimpan'}))
    .catch(() => console.log('Gagal Menyimpan Tim'))
}

const deleteTeam = id => {
    dbPromise
    .then(db => {
        let tx = db.transaction('teams', 'readwrite');
        let store = tx.objectStore('teams');
        store.delete(parseInt(id));
        return tx.complete;
    })
    .then(() => M.toast({html: 'Favorite telah dihapus'}))
}

const dbgetTeam = () => {
    return dbPromise
    .then(db => {
        let tx = db.transaction('teams','readonly')
        let store = tx.objectStore('teams')
        return store.getAll()
    })
    .then(data => data)
}
