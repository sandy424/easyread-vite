import * as auth from './auth.ts';

const result = await auth.postSignup({
    password: "123456",
    private_answer: "강민서",
    private_question: "BEST_FRIEND",
    username: "sandy"
})

console.log(result);