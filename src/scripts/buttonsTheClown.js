import { ServiceForm } from "./serviceForm.js"
import { Reservations } from "./reservations.js"


export const theClowns = () => {
    return `
        <h1>Buttons & Lollipop</h1>
        <section class="serviceForm">
            ${ServiceForm()}
        </section>

        <section class="reservations">
            <h2>Reservations</h2>
            ${Reservations()}
        </section>
    `
}