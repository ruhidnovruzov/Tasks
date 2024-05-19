import logo from "../assets/Logo.svg"
import search from "../assets/search.svg"
import notification from "../assets/notification.svg"
import './navbar.scss'


const Navbar = () => {
  return (
    <div className="flex h-[120px] items-center justify-between">
        <div className="logo">
            <img src={logo} alt="" />
        </div>
        
        <div>
            <ul className="flex py-[10px] px-10 gap-8 bg-[#0F0F0F] border-[4px] border-[#1f1f1f] rounded-xl">
                <li>Home</li>
                <li className="bg-[#1A1A1A] text-white">Movies & Shows</li>
                <li>Support</li>
                <li>Subscriptions</li>
            </ul>
        </div>

        <div className="flex gap-7">
            <img src={search} alt="" />
            <img src={notification} alt="" />
        </div>
    </div>
  )
}

export default Navbar



