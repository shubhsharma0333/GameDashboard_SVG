import React, { useEffect, useState } from "react";
import InputFeild from "../components/InputFeild";
import Card from "../components/Card";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [formValue, setFormValue] = useState({
    id: "",
    name: "",
    url: "",
    author: "",
    published_date: "",
  });
  const [allGames, setAllGames] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedGames, setSearchedGames] = useState([]);
  const [editId, setEditId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
      navigate("/login");
    } else {
      setUserInfo({...user});
      let allGames = JSON.parse(localStorage.getItem("allGames"))
      setAllGames(allGames)
    }
  }, []);

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleDelete = (e) => {
    console.log(e.target.id);
    let temp = [...allGames];
    let index = temp.findIndex((el) => el.id === e.target.id);
    if (index !== -1) {
      temp.splice(index, 1);
      setAllGames(temp);
    }
  };

  const handleEdit = (e) => {
    console.log(e.target.id);
    let temp = [...allGames];
    let index = temp.findIndex((el) => el.id === e.target.id);
    if (index !== -1) {
      setEditId(temp[index].id);
      setFormValue(temp[index]);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      let temp = [...allGames];
      let index = temp.findIndex((el) => el.id === editId);
      temp[index] = {
        ...formValue,
        published_date: moment().format("YYYY–MM-DD HH:mm:ss"),
      };
      setAllGames(temp);
      setEditId(null);
    } else {
      let temp = [...allGames];
      temp.push({
        ...formValue,
        published_date: moment().format("YYYY–MM-DD HH:mm:ss"),
        id: uuidv4(),
      });
      setAllGames(temp);
    }

    setFormValue({
      id: "",
      name: "",
      url: "",
      author: "",
      published_date: "",
    });
  };

  const handleSearch = async (e) => {
    setSearchText(e.target.value);
  };

  const handleLogout = () =>{
    localStorage.removeItem("user");
    navigate("/login")
  }

  useEffect(() => {
    const SearchResults = allGames.filter(
      (game) =>
        game.name.toLowerCase().includes(searchText.toLowerCase()) ||
        game.author.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchedGames(SearchResults);
  }, [searchText]);

  useEffect(()=>{
    if(allGames.length > 0){
      localStorage.setItem("allGames",JSON.stringify(allGames))
    }
  },[allGames])

  return (
    <div
      className="w-[100%] h-[100%] p-2"
      style={{
        background: "linear-gradient(135deg, #2F1B5E, #5D3EBC, #8E7CC3)",
      }}
    >
      <div className="uiBox p-3 h-10 flex flex-row justify-center items-center rounded-none absolute right-5">
        <p className="text-sm text-white">Welcome aboard {userInfo?.username},</p>
        <button
          type="button"
          className="heading w-[120px] ml-2 text-xl text-white rounded-[10px] bg-[#5D3EBC] text-center "
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <h1 className="heading text-8xl text-[#C1B5E0] p-20 ">
        Game <br /> Dashboard
      </h1>
      <div className="uiBox w-[80%] px-5 pt-8 ml-auto mr-auto">
        <h3 className="text-left text-white heading text-4xl ">
          Add Your Game
        </h3>
        <div className="flex flex-col justify-center items-start gap-5 mt-5">
          <form onSubmit={handleSubmit} className="w-full">
            <InputFeild
              name="name"
              placeholder="SpaceX 2.0"
              value={formValue.name}
              handleChange={handleChange}
              type="text"
              LabelName="Game's Name"
            />
            <InputFeild
              name="url"
              placeholder="Url"
              value={formValue.url}
              handleChange={handleChange}
              type="text"
              LabelName="Enter Url"
            />
            <InputFeild
              name="author"
              placeholder="John Doe"
              value={formValue.author}
              handleChange={handleChange}
              type="text"
              LabelName="Enter Author's Name"
            />
            <button
              type="submit"
              className="heading w-[200px] ml-auto mr-auto h-[45px] text-2xl text-white rounded-[10px] bg-[#5D3EBC] text-center my-10 "
            >
              {editId ? "Save" : "Add"}
            </button>
          </form>
        </div>
      </div>
      <div className="mt-10 w-[70%] m-auto">
        <h2 className="heading text-[#C1B5E0] text-3xl text-start">
          Search Games:
        </h2>

        <InputFeild
          name="name"
          placeholder="SpaceX 2.0"
          value={searchText}
          handleChange={handleSearch}
          type="text"
          inputStyles="bg-[#C1B5E0] text-gray-200"
        />
      </div>
      <div className="bg-[#bab7c332] m-10 uiBox p-4">
        <h1 className="heading text-grey-900 text-3xl my-3">All Games:</h1>
        <div className="flex items-center justify-center">
          <div className="grid lg:grid-cols-4 sm:grid-cols-3 sx:grid-cols-2 grid-cols-1 gap-y-7 gap-x-8 ">
            {searchText
              ? searchedGames.map((game) => (
                  <Card
                    {...game}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    key={game.id}
                  />
                ))
              : allGames.map((game) => (
                  <Card
                    {...game}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    key={game.id}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
