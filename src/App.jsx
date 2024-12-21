import './App.css';
import UserList from './components/userList';
function App() {
  /* const [data, setData] = useState([]);
  const [newData, setNewData] = useState(null);
  const user = {
    Name: "Rahini",
    E_mail: "Rahini@gmail.com"
  };
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((result) => setData(result.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios.post("https://jsonplaceholder.typicode.com/users", user)
      .then((response) => setNewData(response.data))
      .catch((error)=>{
        console.log(error);
      })
  },[]);
 */

  return (
   
      <div className='container'>
               <UserList/>
        </div>
   
  )
}

export default App;
