import Highlighter from "react-highlight-words"

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

/*
Adapted from: https://gitlab.com/salbedaiwi/cs373-idb-13/-/blob/main/frontend/src/tools.js
*/
export function Highlight(text, search){
  if(search && search !== ""){
    return (
        <Highlighter textToHighlight={text} searchWords={search} autoEscape={true}/>
      )
  }
  else{
    return text
  }
}