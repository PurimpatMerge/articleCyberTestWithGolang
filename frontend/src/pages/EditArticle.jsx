import Navbar from '../components/home/Navbar'
import bg from '../assets/bg-room.jpg'
import Editarticletable from '../components/editarticle/Editarticletable.jsx'
const EditArticle = () => {
    return (
        <div >
            <img src={bg} alt="bg" className='absolute h-screen bg-cover w-full -z-10' />
            <Navbar />
            <Editarticletable />
        </div>
    )
}
export default EditArticle;