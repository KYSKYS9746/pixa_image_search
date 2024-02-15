import axios from "axios";
import { useEffect, useState } from "react";

const Search = () => {


    const [photo, setPhoto] = useState([]);

    const [input, setInput] = useState('물');
    const [search, setSearch] = useState('');


    const InputHandler = e => {
        console.log(e.target.value);
        const { value } = e.target;
        setInput(value);
    }

    const submitHandler = e => {
        e.preventDefault();
        // if (input.length < 3) {
        //     alert('더 입력해주세요.');
        //     return;
        // }
        setSearch(input);
        console.log(input.length);



    }

    const getData = async () => {
        const r = await axios.get(`https://pixabay.com/api/?key=42380607-4b2d40451b263e382a0dd8d9d&q=${search}&image_type=photo&per_page=200`);

        const d = r.data.hits;
        setPhoto(d);

        console.log(d);
    }

    useEffect(() => {
        getData();
    }, [search])


    return (
        <>
            <header>
                <h1>
                    이미지 검색 {search}
                </h1>
                <form onSubmit={submitHandler}>
                    <input type="text" onChange={InputHandler} />
                    <button>SEARCH</button>
                </form>
            </header>
            <ul className="list">
                {
                    photo.map((it, idx) => {
                        return (
                            <li>
                                <img src={it.largeImageURL} alt="" />
                                {it.id}
                            </li>
                        )
                    })
                }
            </ul>
            <footer>
                &copy; kim.
            </footer>
        </>
    )
}

export default Search;