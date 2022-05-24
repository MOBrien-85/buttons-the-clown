import { render } from "./main.js"

const applicationState = {
    reservations: [],
}

const API = "http://localhost:8088"

const mainContainer = document.querySelector("#container")

export const fetchReservations = () => {
    return fetch(`${API}/reservations`)
        .then(response => response.json())
        .then(
            (clownReservations) => {
                // Store the external state in application state
                applicationState.reservations = clownReservations
            }
        )
}

// Define and export a function named getRequests that returns a copy of the requests state. 
export const getReservations = () => {
    return applicationState.reservations.map(reservation => ({...reservation}))
}

export const getClowns = () => {
    return applicationState.clowns.map(clown => ({...clown}))
}

// using the post method to create something new: a new reservation which will be stored
// in the api database
export const sendReservation = (userClownRes) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userClownRes)
    }
    return fetch(`${API}/reservations`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })       
}

// this will allow me to invoke the render function on main.js. when the state changes this will let main.js know to repopulate the html without any input.
mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)
// this function will allow Buttons and Lollipop to deny any reservation they are unable to complete.

export const denyRequest = (id) => {
    return fetch(`${API}/reservations/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}
// acces the json database clowns array before returning the application state
export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.clowns = data
            }
        )
}

// below i've written two functions. first to save completed parties to the api.
// second to fetch those completions that will be saved. 
export const saveCompletion = (completedParties) => {
    const fetchCompletions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedParties)
    }

    return fetch(`${API}/completions`, fetchCompletions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}
