export function sumTests(teamData){
    let sum = 0
    teamData.forEach((member) => {
      sum += member.unit_tests
    })
  
    return sum
  }

export function inchToFeet(inches){
  let feet = Math.floor(inches / 12)
  let remainder = inches % 12

  return feet + "\' " + remainder  + "\'"
}

export function GenerateMapQuerry(str){
  let q = str
  q = q.replace(" ", "+")
  q = q.concat("+stadium")
  return q
}