function getTimeAgo(createdAt) {
    let now = new Date()
    let createdDate = new Date(createdAt)
    let a = now - createdAt
    let menit = Math.floor(a / (1000 * 60))
    let jam = Math.floor(a / (1000 * 60 * 60))
    let detik = Math.floor(a % 60);

    if(menit < 60){
        return `${menit} minutes ago`
    } 
    
    if(menit < 1){
        return `${detik} seconds ago`
    } 
    
    if(menit > 60){
        return `${jam} hours ago`
    } 
    
}

module.exports = getTimeAgo
