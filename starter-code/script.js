const searchInput = document.querySelector("main > div > input");
const body = document.querySelector("body")
// const fontFamily = localStorage.getItem("fontFamily")
const dropdownMenuBtn = document.querySelector(".dropdown_menu_btn");
const dropdownOptions = document.querySelector(".options");
const optionItems = dropdownOptions.querySelectorAll("li");
const dropDownMenuText = dropdownMenuBtn.querySelector("span");
const darkModeSlider = document.querySelector(".switch")
const darkModeSliderInput = document.querySelector(".switch > input")
let darkMode = localStorage.getItem('darkMode')

// Dark mode

const enableDarkMode=()=>{
    body.setAttribute("data-theme","dark")
    localStorage.setItem("darkMode","enabled")
}
const disableDarkMode=()=>{
    body.setAttribute("data-theme","light")
    localStorage.setItem("darkMode",null)
}
if(darkMode==="enabled"){
    darkModeSliderInput.classList.add("checked")
    dropdownOptions.classList.add("dark")
    searchInput.classList.add("dark")
    enableDarkMode()
}
darkModeSlider.addEventListener("click",()=>{
    if(darkMode!=="enabled"){
        darkMode = localStorage.getItem('darkMode')
        darkModeSliderInput.classList.add("checked")
        dropdownOptions.classList.add("dark")
        searchInput.classList.add("dark")
        // darkModeSlider.attributes.checked.value = "on"
        enableDarkMode()
    }
    else{
        darkModeSliderInput.classList.remove("checked")
        searchInput.classList.remove("dark")
        dropdownOptions.classList.remove("dark")
        darkMode = localStorage.getItem('darkMode')
        // darkModeSlider.attributes.checked.value = "off"
        disableDarkMode()
    }
})


let mainText = document.querySelector("main > .word");
dropdownMenuBtn.addEventListener("click", (e) => {
    dropdownOptions.classList.add("active");
    optionItems.forEach(function (opt) {
        opt.addEventListener("click", (e) => {
            let fontName = e.target.innerText;
            if (fontName === "Sans Serif") {
                document.documentElement.style.setProperty(
                    "--font-name",
                    "sans-serif"
                );
                dropDownMenuText.textContent = "Sans Serif";
            }
            if (fontName === "Serif") {
                document.documentElement.style.setProperty(
                    "--font-name",
                    "serif"
                );
                dropDownMenuText.textContent = "Serif";
            }
            if (fontName === "Mono") {
                document.documentElement.style.setProperty(
                    "--font-name",
                    "monospace"
                );
                dropDownMenuText.textContent = "Mono";
            }
            dropdownOptions.classList.remove("active");
        });
    });
});

//! Fetch Data
searchInput.addEventListener("keyup", (e) => {
    let searchTerm = e.target.value;
    if (e.keyCode == 13) {
        if (searchTerm == "") {
            mainText.innerHTML = `
            <p class="empty">Whoops, can’t be empty…</p>
            `;
            searchInput.style.outlineColor = "#FF5252";
            searchInput.style.border = "1px solid #FF5252";
        } else {
            searchInput.style.outlineColor = "#a445ed";
            searchInput.style.border = "none";
            getDictonaryData(searchTerm);
        }
    }
});

function getDictonaryData(term) {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + term)
        .then((res) => {
            if (res.status == 404) {
                mainText.innerHTML = `
                    <div class="err_404">
                        <span>🫤</span>
                        <h2>No defination found</h2>
                        <p>
                        Sorry pal, 
                        we couldn't find definitions for the word you were looking for. 
                        You can try the search again at later time or head to the web instead.
                        </p>
                    </div>


                `;
                return res.status;
            } else {
                return res.json();
            }
        })
        .then((data) => {
            if (data == 404) {
                console.error("Error 404,not found");
            } else {
                mainText.innerHTML = "";
                data.map((item) => {
                    const { audio } = item.phonetics[0];
                    mainText.innerHTML += `
                    <div class="word__title">
                        <div>
                            <h1>${item.word}</h1>
                            <span>${item?.phonetics[1]?.text || ""}</span>
                        </div>
                        <button class="play__btn" onclick='playTextVoice("${audio}")'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="75"
                                height="75"
                                viewBox="0 0 75 75"
                            >
                                <g fill="#A445ED" fill-rule="evenodd">
                                    <circle
                                        cx="37.5"
                                        cy="37.5"
                                        r="37.5"
                                        opacity=".25"
                                    />
                                    <path d="M29 27v21l21-10.5z" />
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div class="word__partOfSpeech">
                        <div class="word__partOfSpeech_title">
                            noun
                            <div></div>
                        </div>
                        <div class="meaning">
                            <ul>
                                <span>Meaning</span>
                                ${item.meanings[1]?.definitions.map((def) => {

                                    return `
                                    <li>${def.definition}</li>
                                    `;
                                })}
                            </ul>
                        </div>
                    </div>
                `;
                });
            }
        });
}

function playTextVoice(source) {
    console.log(source);
    const audio = new Audio();
    audio.src = source;
    audio.play();
}
