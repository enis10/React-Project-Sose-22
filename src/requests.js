const API_KEY = "0b9f997ba8b82eaa161309a7c35655de";



    const requests = {
        
        fetchTrending: "https://api.themoviedb.org/3/movie/now_playing?api_key=0b9f997ba8b82eaa161309a7c35655de&language=de&page=1",
        
       fetchTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=de`,
       fetchPolular : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=de&page=1`,
       IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/original'
      
       
    }

    export default requests;



