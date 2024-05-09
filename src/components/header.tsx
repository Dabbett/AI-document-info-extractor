import Link from "next/link"

const Header = () => {
    
    return (
        <header>
            <nav className="px-4 py-2.5 flex gap-2">
                <Link href={"/quiz"} className=" border rounded m-1 py-1 px-4"> Sample Quiz</Link>
                <Link href={"/quiz/new"} className=" border rounded m-1 py-1 px-4"> New Quiz</Link>
            </nav>
        </header>
    )
}

export default Header