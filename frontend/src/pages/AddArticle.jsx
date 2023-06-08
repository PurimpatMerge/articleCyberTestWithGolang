import Navbar from '../components/home/Navbar'
import Addarticleinput from '../components/addarticle/Addarticleinput'
import bg from '../assets/bg-room.jpg'
const AddArticle = () => {
    return (
        <div >
            <img src={bg} alt="bg" className='absolute h-screen bg-cover w-full -z-10' />
            <Navbar />
            <Addarticleinput/>
        </div>
    )
}
export default AddArticle;