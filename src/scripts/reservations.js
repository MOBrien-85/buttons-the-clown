import { getReservations, getClowns, denyRequest, fetchReservations } from "./dataAccess.js"


// listen for the delete button!
const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("reservation--")) {
        const [,reservationId] = click.target.id.split("--")
        denyRequest(parseInt(reservationId))
    }
})

// eventlistener for the select menu -- assigning parties to clown
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "clowns") {
            const [reservationId, clownId] = event.target.value.split("--")

            const completion = {
                reservationId: reservationId,
                clownId: clownId,
                date_created: Date.now()
            }
            fetchReservations(completion)
        }
    }
)


export const Reservations = () => {
    const reservations = getReservations()
    const clowns = getClowns()

    let html = "<ul>"

    const listReservations = reservations.map(
        (reservation) => {
            return `
            <li>
            ${reservation.parentName}'s Party
                <select class="clowns" id="clowns">
                <option value="">Choose</option>
            ${clowns.map(
                clown => `<option value="${reservation.id}--${clown.id}">${clown.name}</option>`
            
            ).join("")}
                </select>
                
                    <button class="reservation_delete"
                        id="reservation--${reservation.id}">
                            Deny
                    </button>
            </li>
            `
        }
    )
        html += listReservations.join("")
        html+= "</ul>"

        return html
}


