const fetchDataFromApi = async (search) => {
    const result = await axios.get(' http://www.omdbapi.com/', {
        params: {
            apikey: 'dea96a50',
            s: search
        }
    })
    return result.data.Error ? [] : result.data.Search;
}

const fetchElement = async (search) => {
    const result = await axios.get(' http://www.omdbapi.com/', {
        params: {
            apikey: 'dea96a50',
            i: search
        }
    })
    return  result.data;
}

// debounce


// intit autocomplite
createAutocomplete({
    root:document.querySelector('.autocomplete'),
    fetchData:fetchDataFromApi,
    renderItem(item){
        let imgSrc = item.Poster === 'N/A' ? ' ' : item.Poster;
        return `
        <img src=${imgSrc} />
        <h2>${item.Title}(${item.Year})<h2/>
       `;
    },
    onItemSelect(item){onItemSelect(item)},
    inputValue(item){
    return item.Title;
    }
})

// itemDetailTemplete and on select item
const itemDetailTemplete=(itemDetail)=>{
    return `
       <article class="media">
         <figure class="media-img">
            <img src="${itemDetail.Poster}" alt="Trulli" style="height: 100px;">
            <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
         </figure>
         <div class="media-content">
            <div class="content">
               <h2>${itemDetail.Title}</h2>
               <h2>${itemDetail.Genre}</h2>
               <p>${itemDetail.Plot}</p>
            </div>
         </div>
       </article>
       <article class="notification">
         <p>${itemDetail.Awards}</p>
         <p>Awards</p>
       </article>
       <article class="notification">
         <p>${itemDetail.BoxOffice}</p>
         <p>BoxO ffice</p>
       </article>
       <article class="notification">
         <p>${itemDetail.Metascore}</p>
          <p>Meta score</p>
       </article>
       <article class="notification">
         <p>${itemDetail.imdbRating}</p>
         <p> imdb Rating</p>
     </article>
     <article class="notification">
        <p>${itemDetail.imdbVotes}</p>
        <p> imdb Votes</p>
     </article>
    `
}

const onItemSelect=async(item)=>{
    const itemDetail=await fetchElement(item.imdbID);
    let summary=document.getElementById('summary');
    summary.innerHTML=itemDetailTemplete(itemDetail);
}


// search 



