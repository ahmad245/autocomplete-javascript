const createAutocomplete = ({ root,fetchData ,renderItem,onItemSelect,inputValue}) => {
    root.innerHTML = `
       <label for="input">Search <label/>
       <input type="text"  name="" class="input">
       <div class="dropdown">
         <div class="dropdown-container">
            <ul class="dropdown-menu">
     
            </ul>
          </div>
       </div>
`;
    let dropdownMenu = root.querySelector('.dropdown-menu');

    const input = root.querySelector('input');

    const onInput = async (event) => {
        const items = await fetchData(event.target.value);
        if (!items.length) {
            dropdownMenu.classList.remove('show-menu');
            return;
        }
        dropdownMenu.classList.add('show-menu');
        dropdownMenu.innerHTML = "";
        for (const item of items) {
            let li = document.createElement('li');

            li.innerHTML = renderItem(item);
            dropdownMenu.appendChild(li);
            li.addEventListener('click', (event) => {
                dropdownMenu.classList.remove('show-menu');
                input.value =inputValue(item);
                onItemSelect(item);
            })
        }

    }

    document.addEventListener('click', (event) => {
        if (!root.contains(event.target)) {
            dropdownMenu.classList.remove('show-menu');
            console.log(root.contains(event.target));

        }
    })
    input.addEventListener('input', debounce(onInput), 1000);
}