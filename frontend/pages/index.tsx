import Todo from "@components/Todo";
import Head from "next/head";

const Home = () => {
  return (
    <div className="container">
      <Head>
        <title>Create Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Todo />
      </main>
    </div>
  );
};

export default Home;
