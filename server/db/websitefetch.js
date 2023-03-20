console.clear()
for (let child of document.querySelector("#lehrpersonen").querySelectorAll(".grayblock")) {
  try {
    let inputString = child.querySelector(".person_info").children[0].innerText
    let commaIndex = inputString.indexOf(",");
    let bracketOpenIndex = inputString.indexOf("[");
    let bracketCloseIndex = inputString.indexOf("]");

    let lastName = inputString.substring(0, commaIndex).trim()
    let firstName = inputString.substring(commaIndex + 1, bracketOpenIndex).trim()
    let abbreviation = inputString.substring(bracketOpenIndex + 1, bracketCloseIndex)
		let title = inputString.substring(bracketCloseIndex + 1, inputString.length).trim()
    let info = child.querySelector(".person_info").children[1].innerText.trim()
    let link = child.querySelector(".wp-post-image").src
    data[abbreviation] = {name: lastName, firstName: firstName, shortName: abbreviation, link, info, title, type:"teacher"}
  } catch {
    continue
  }
}

console.log(data)