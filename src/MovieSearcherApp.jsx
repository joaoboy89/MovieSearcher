import { useState } from "react"

export const MovieSearcherApp = () => {

  const urlBase = 'https://api.themoviedb.org/3/search/movie'
  const apiKey = 'e2ce5b0bcc5322f33e7e87619ced63fb'

  const [searcherM, setSearcherM] = useState('')
  const [movies, setMovies] = useState([])

  const handleInputChange = (e) => {
    setSearcherM(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchMovies()
  }

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${urlBase}?query=${searcherM}&api_key=${apiKey}`)
      const data = await response.json()
      console.log(data)
      setMovies(data.results)
    } catch (error) {
      console.error("ha ocurrido un error")
    }
  }

  return (
    <div className="container">
      <h1 className="title"> Movie Searcher </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write a movie"
          value={searcherM}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="search-button"
        >Search</button>
      </form>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
