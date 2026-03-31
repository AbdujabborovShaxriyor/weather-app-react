import headerImage from "../assets/headerImage.png"

export default function Header(){
    return (
        <header className="header">
            <img className="header-img" src={headerImage} alt="There was a header image" />
            <p className="header-title">Weather <span>App</span></p>
        </header>
    )
}
