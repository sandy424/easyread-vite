import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="bg-mint-50 w-full min-h-screen flex flex-col items-center font-ko">
            <header className="flex items-center justify-between h-14 px-6 fixed top-0 left-0 right-0 bg-white border-b border-mint-100 z-50">
                <div className="w-24"></div>

                <span className="text-2xl font-semibold font-en text-mint-900 text-center">
                    EZREAD
                </span>

                <nav className="flex items-center justify-end text-sm text-mint-600">
                    <Link to="/login" className="hover:text-mint-900 transition-colors">
                        로그인
                    </Link>
                    <span className="inline-block w-px h-3 bg-mint-200 mx-3"></span>
                    <Link to="/signup" className="hover:text-mint-900 transition-colors">
                        회원가입
                    </Link>
                </nav>
            </header>

            <div className="h-14" />

            {/* 페이지 콘텐츠 */}
            <main className="w-full p-12">
                {/* 여기에 콘텐츠 */}
            </main>

        </div>
    )
}