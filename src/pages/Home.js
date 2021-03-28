import React, { useEffect, useState } from 'react'
import './Home.css'


function useSearchMovie(query) {
    const [result, setResult] = useState([])
    async function searchMovie() {
        try {
            const response = await fetch(`http://www.omdbapi.com?apikey=73110705&s=${query}`)
            const data = await response.json()
            console.log(data)
            setResult(data.Search)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        console.log(query)

        if (query !== '') {
            searchMovie()
        }
    }, [query])
    return result
}





function Home() {
    const [search, setSearch] = useState("")
    const [query, setQuery] = useState("")
    const results = useSearchMovie(query)





    return (
        <div className="home-container justify-content-center">
            <h1>Hello There</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
                setQuery(search)
            }}>
                <div class="input-group mb-3" style={{ margin: "0 auto", width: "80%" }}>
                    <input type="text" onChange={e => setSearch(e.target.value)} value={search} class="form-control" placeholder="Search..." aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button class="btn btn-dark" type="submit" id="button-addon2" >Search</button>
                </div>
            </form>
            <hr />
            {console.log(results)}
            {results.map((data, index) => {
                return (
                    <div key={index} class="card" style={{ margin: "0 auto", width: "18rem" }}>
                        <img src={data.Poster} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">{data.Title}</h5>
                            <p class="card-text"> Released on {data.Year} </p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default Home
