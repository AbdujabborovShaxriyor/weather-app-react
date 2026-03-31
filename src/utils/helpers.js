export function getMostCommon(array){
    const counts = {}
    array.forEach(element => {
        if(!counts[element]){
            counts[element] = 1
        }else{
            counts[element]+=1
        }
    });
    const mostCommon = Object.entries(counts).sort((a,b)=>b[1]-a[1])
    return mostCommon[0][0]
}

export function calculateAverage(array){
    let sum = 0
    let count = 0
    array.forEach(element => {
        sum+=element
        count+=1
    })
    return Math.round(sum/count)
}

export function getDayName(date){
    return new Date(date).toLocaleDateString('en-US',{weekday:'short'})
}