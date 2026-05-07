import { useEffect, useState } from "react";
import * as log from '../api/usageLog.ts';
import { useNavigate } from "react-router-dom";

export default function Home() {

    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | undefined>();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate()

    // 글 바꾸기 버튼 함수
    const handleSubmit = async() => {
        try{
            setIsLoading(true);
            const res = await log.postUpLoad(title, file);
            navigate(`/mypage/detail/${res.id}`); 
        } catch (err) {
            console.log(err.response.data.detail);
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <div className="max-w-lg mx-auto px-4 pt-16 py-8">
      <div className="bg-white border border-mint-100 rounded-xl p-7">

        {/* 제목 */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-mint-600 mb-1.5">제목</label>
          <input
            type="text"
            maxLength={200}
            placeholder="기록 제목을 입력하세요 (1~200자)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2.5 text-sm border border-mint-100 rounded-lg bg-white text-mint-900 outline-none focus:border-mint-600 focus:ring-2 focus:ring-mint-50"
          />
        </div>

        {/* 파일 드롭존 */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-mint-600 mb-1.5">파일</label>
          <label
            className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl py-8 px-4 cursor-pointer transition-colors
              ${file ? 'border-mint-600 bg-mint-50' : 'border-mint-100 bg-mint-10 hover:border-mint-600 hover:bg-mint-50'}`}
          >
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif,application/pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            {file ? (
              <>
                <span className="text-2xl text-mint-600">✓</span>
                <span className="text-sm font-medium text-mint-900">{file.name}</span>
              </>
            ) : (
              <>
                <span className="text-sm text-mint-500">클릭하거나 파일을 드래그하세요</span>
                <span className="text-xs text-mint-500">PNG · JPEG · WEBP · GIF · PDF</span>
              </>
            )}
          </label>
        </div>

        {/* 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={isLoading || !title || !file}
          className="w-full py-2.5 text-sm font-medium rounded-lg bg-mint-600 text-white transition-colors hover:bg-mint-900 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLoading ? '분석 중...' : '업로드'}
        </button>

        {/* 로딩 안내 */}
        {isLoading && (
          <p className="text-xs text-mint-500 text-center mt-3">
            분석 중이에요. PDF는 시간이 걸릴 수 있어요.
          </p>
        )}

      </div>
    </div>
    )
}