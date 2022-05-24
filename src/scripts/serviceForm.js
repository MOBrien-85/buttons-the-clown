import { sendReservation } from "./dataAccess.js"


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRes") {
        // Get what the user typed into the form fields
        const parentName = document.querySelector("input[name='parentName']").value
        const childName = document.querySelector("input[name='childName']").value
        const userAddress = document.querySelector("input[name='address']").value
        const childCount = document.querySelector("input[name='childCount']").value
        const resDate = document.querySelector("input[name='resDate']").value
        const resLength = document.querySelector("input[name='resLength']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            parentName: parentName,
            childName: childName,
            address: userAddress,
            childCount: childCount,
            resDate: resDate,
            resLength: resLength
        }

        // Send the data to the API for permanent storage
        sendReservation(dataToSendToAPI)
    }
})


// build a service form for users to reserve a clown for a party
// include the following: parent name, child name, how many kids, address, date of reservation, length of res
export const ServiceForm = () => {
    let html = `
        <div class="field">
            <label class="label" for="parentName">Parent Name</label>
            <input type="text" name="parentName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="childName">Child's Name</label>
            <input type="text" name="childName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="address">Address</label>
            <input type="text" name="address" class="input" />
        </div>
        <div class="field">
            <label class="label" for="childCount">How many children?</label>
            <input type="number" name="childCount" class="input" />
        </div>
        <div class="field">
            <label class="label" for="resDate">Date of party</label>
            <input type="date" name="resDate" class="input" />
        </div>
        <div class="field">
            <label class="label" for="resLength">Length of res (hours)?</label>
            <input type="number" name="resLength" class="input" />
        </div>

        <button class="button" id="submitRes">Submit</button>
    `

    return html
}
