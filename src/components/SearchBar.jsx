export default function SearchBar({searchCity}){

    function handleSubmit(event){
        event.preventDefault()
        const formData = new FormData(event.target)
        const city = formData.get('city')

        if (city.trim()==="") return 

        searchCity(city)
        event.target.reset()
    }

    return(
        <main className="search-container">
            <form className="search-form" onSubmit={handleSubmit}>
                <input className="search-input" type="text" name="city"/>
                <button className="search-btn" type="submit">search</button>
            </form>
        </main>
    )
}