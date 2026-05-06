import { useEffect, useState } from "react";
import * as log from '../api/usageLog.ts';

export default function Home() {

    const [title, setTitle] = useState("");
    const [file, setFile] = useState();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    // 글 바꾸기 버튼 함수
    const handleSubmit = async() => {
        try{
            setIsLoading(true);
            const res = await log.postUpLoad({
                id,
                title,
                file_name,
                s3_key,
                compact_result,
                created_at,
                updated_at
            });
            console.log(res);
        } catch (err) {
            console.log(err.response.data.detail);
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <div className="bg-mint-50 w-full min-h-screen flex flex-col items-center font-ko">

        </div>
    )
}