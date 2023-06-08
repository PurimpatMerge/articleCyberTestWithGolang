import Navbar from "../components/home/Navbar";
import ShowArticle from "../components/home/ShowArticle"
import bg from '../assets/bg-room.jpg'
const Home = () => {
    return (
        <div >
             <img src={bg} alt="bg" className='absolute h-screen bg-cover w-full -z-10'/>
            <Navbar />
            <ShowArticle />
        </div>
    )
}
export default Home;