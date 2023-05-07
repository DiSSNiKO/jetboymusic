import { useRef } from "react";

function SearchBar(props) {
    const { setSearchKey } = props;
    const serch = useRef(null);
    return (
        <div className="search-bar-cont">
            <div className='magni-ikonka'>
                <img src="/images/musnote.svg" alt="" />
            </div>
            <div className="input-n-dec">
                <form action="" onSubmit={(e) => {
                    e.preventDefault();
                    setSearchKey(serch.current.value);
                    console.log(serch.current.value)
                }}>
                    <input type="text" ref={serch} />
                </form>
                <div className="hover-decor"></div>
            </div>
        </div>
    );
}

export default SearchBar;
