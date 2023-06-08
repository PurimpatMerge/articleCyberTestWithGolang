
import Navbar from '../components/home/Navbar'
import Articlebody from '../components/articlecontent/Articlebody'
import bg from '../assets/bg-room.jpg'
const ArticleContent = () => {
    return (
        <div >
             <img src={bg} alt="bg" className='absolute h-screen bg-cover w-full -z-10 bg-repeat-y' />
             <Navbar/>
             <Articlebody/>
        </div>
    )
}
export default ArticleContent;