function getTimeAgo(createdAt) {
    let now = new Date()
    let createdDate = new Date(createdAt)
    let a = now - createdDate

    let detik = Math.max(1, Math.floor(a / 1000));
    let menit = Math.floor(a / (1000 * 60))
    let jam = Math.floor(a / (1000 * 60 * 60))
    
    if(detik < 60){
        return `${detik} seconds ago`
    } 
    
    if(menit < 60){
        return `${menit} minutes ago`
    } 
    
    return `${jam} hours ago`
    
}

module.exports = getTimeAgo
