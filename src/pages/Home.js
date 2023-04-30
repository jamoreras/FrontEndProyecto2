import React, { useState, useEffect } from 'react';
import NavbarUser from '../components/Navbar';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Cards from '../components/Cards';
import '../styles/Home.css'

function Home() {

  const [news, setNews] = useState([]);
  const [category, setCategory] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);
  let user = JSON.parse(localStorage.getItem('user'));
  const categoriesUrl = "http://localhost:4000/api/category"
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));
  let [guardnew, setGuard] = useState({});

  const getNews = async () => {
    try {
      const query = `
      query Query($newsByUserIdId: String) {
        newsByUserId(id: $newsByUserIdId) {
          title
          description
          permanLink
          date
          newsSourceId
          userId
          categoryId
          src
        }
      }
       `;
      const variables = {
        newsByUserIdId: user.id,
      };

      axios.post('http://localhost:5000/', { query, variables },
      ).then(function (response) {
        console.log(response.data.data);
        setGuard(response.data.data.newsByUserId);//respaldo de la noticias
        setNews(response.data.data.newsByUserId);
        //setCategory(response.data.data.Categorias);
        // setLoading(false);
      }).catch(err => {
        console.console.log(err);
      });



    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {

    getNews();
    getCategories();

  }, []);

  const getCategories = async () => {
    try {
      const datos = await axios.get(categoriesUrl, {
        headers: { 'Authorization ': ' Bearer ' + token, 'Content-Type ': 'application/json' }
      });
      setCategoriesList(datos.data);
    } catch (e) {
      console.log(e);
    }
  };


  const handleCategoryChange = (category) => {
    console.log(category);
    if (category === "todo") {
      setNews(guardnew);
    } else {
      const query = `
      query Query($newsByCategoryId: String, $name: String) {
        newsByCategory(id: $newsByCategoryId, name: $name) {
          title
          description
          permanLink
          date
          newsSourceId
          userId
          categoryId
          src
        }
      }
       `;
      const variables = {
        newsByCategoryId: user.id,
        name: category,
      };

      axios.post('http://localhost:5000/', { query, variables },
      ).then(function (response) {
        console.log(response.data.data);
        setNews(response.data.data.newsByCategory);
        //setCategory(response.data.data.Categorias);
        // setLoading(false);
      }).catch(err => {
        console.console.log(err);
      });
    }
  };
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = () => {
    const query = `
    query NewsBySearch($newsBySearchId: String, $valor: String) {
      newsBySearch(id: $newsBySearchId, valor: $valor) {
        title
        description
        permanLink
        date
        newsSourceId
        userId
        categoryId
        src
      }
    }
     `;
    const variables = {
      newsBySearchId: user.id,
      valor: searchTerm,
    };

    axios.post('http://localhost:5000/', { query, variables },
    ).then(function (response) {
      console.log(response.data.data);
      setNews(response.data.data.newsBySearch);
      //setCategory(response.data.data.Categorias);
      // setLoading(false);
    }).catch(err => {
      console.console.log(err);
    });
  }
  


  return (
    <>
      <NavbarUser />
      <h1>NEWS COVER</h1>
      <div className='search'>
        <input type='text' placeholder='Buscar...' onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      <div className='categorias'>
        <FloatingLabel className="mb-3" controlId="floatingSelect" label="Select category">
          <Form.Select className="select" aria-label="Floating label select example" value={category} onChange={(e) => { setCategory(e.target.value); handleCategoryChange(e.target.value); }}>
            <option value="todo">Todo</option>
            {categoriesList.map((cat) => {
              return (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              );
            })}
          </Form.Select>
        </FloatingLabel>
      </div>
      <div className='noticias'>
        {
          news.map((item) => (
            <Cards item={item} key={item._id} />
          ))
        }
      </div>

    </>
  )
}

export default Home
