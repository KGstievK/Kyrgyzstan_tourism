import {api as index} from ".."

const api = index.injectEndpoints({
    endpoints: (build) => ({
        getAirTickets: build.query ({
            query: () => ({
                url: "airline_tickets",
                method: "GET"
            })
        })
        
    })
})