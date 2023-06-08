import Navbar from '../components/home/Navbar'
import bg from '../assets/bg-room.jpg'
import Editusersable from '../components/editusers/Edituserstable.jsx'


const EditUsers = () => {

    return (
        <div >
            <img src={bg} alt="bg" className='absolute h-screen bg-cover w-full -z-10' />
            <Navbar />
            <Editusersable />
        </div>
    )
}
export default EditUsers;