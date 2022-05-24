import { fetchReservations, fetchClowns } from "./dataAccess.js"
import { theClowns } from "./buttonsTheClown.js"




const mainContainer = document.querySelector("#container")

export const render = () => {
    fetchReservations()
    .then(() => fetchClowns())
    .then(
        () => {
            mainContainer.innerHTML = theClowns()
        }
    )
}

render()
